<template>
  <v-form @submit.prevent="admitPatient">
    <CardDefault :loading="loading">
      <template #title>
        <v-icon left>fa-heart-circle-plus</v-icon>
        New Encounter
      </template>
      <template #body>
        <div>
          <div class="title secondary--text mb-10">
            {{ `${patient.name} | ${patientId}` }}
          </div>
          <v-container>
            <v-form>
              <div class="row">
                <div class="col-12">
                  <FormTextArea
                    label="Chief Complaint"
                    v-model="form.chiefComplaint"
                  />
                </div>
                <div class="col-12">
                  <FormTextField
                    v-model="form.roomNo"
                    label="Room"
                    icon="fa-door-open"
                  />
                </div>
                <div class="col">
                  <FormTextField
                    v-model="form.id.senior"
                    label="Senior Citizen ID"
                    icon="fa-person-walking-with-cane"
                  />
                </div>
                <div class="col">
                  <FormTextField
                    v-model="form.id.pwd"
                    label="PWD ID"
                    icon="fa-wheelchair"
                  />
                </div>
                <div class="col">
                  <FormTextField
                    v-model="form.id.sss"
                    label="SSS"
                    icon="fa-id-card-clip"
                  />
                </div>
              </div>
            </v-form>
          </v-container>
        </div>
      </template>

      <template #actions>
        <v-btn :loading="form.isSaving" type="submit" color="primary">
          <v-icon left>fa-save</v-icon>
          Admit Patient
        </v-btn>
      </template>
    </CardDefault>
  </v-form>
</template>
<script>
export default {
  name: 'EncounterForm',
  props: {
    patientId: { type: String, required: true },
  },
  data() {
    return {
      loading: false,
      form: {
        chiefComplaint: null,
        roomNo: null,
        id: {
          pwd: null,
          senior: null,
          sss: null,
        },
        isSaving: false,
      },
      attrs: {
        outlined: true,
      },
      patient: {
        name: '',
      },
    }
  },
  computed: {
    listResource() {
      return {
        resourceType: 'List',
        status: 'current',
        title: 'ids',
        date: this.form.date,
        subject: {
          reference: `Patient/${this.patientId}`,
          display: this.patient.name,
          type: 'Patient',
        },
        encounter: {
          reference: `Encounter/{encounterId}`,
          type: 'Encounter',
        },
        entry: [
          {
            date: this.form.date,
            item: { identifier: { value: this.form.id.pwd }, display: 'PWD' },
          },
          {
            date: this.form.date,
            item: {
              identifier: { value: this.form.id.senior },
              display: 'SENIOR',
            },
          },
          {
            date: this.form.date,
            item: { identifier: { value: this.form.id.sss }, display: 'SSS' },
          },
        ],
      }
    },
    patientResource() {
      return {
        resourceType: 'Encounter',
        status: 'in-progress',
        identifier: [{ value: process.env.IDENTIFIER }],
        diagnosis: [
          {
            use: {
              text: this.form.chiefComplaint,
              coding: [
                {
                  display: 'Chief Complaint',
                },
              ],
            },
            condition: { display: 'Chief Complaint' },
          },
        ],
        subject: {
          reference: `Patient/${this.patientId}`,
          display: this.patient.name,
          type: 'Patient',
        },
        class: [{ text: 'ipd' }],
        location: [
          {
            location: {
              identifier: {
                type: { text: 'Room' },
                value: this.form.roomNo,
              },
            },
            period: { start: this.form.date },
          },
        ],
      }
    },
  },
  methods: {
    async admitPatient() {
      this.form.isSaving = true
      this.form.date = new Date().toISOString()

      const encounter = await this.$axios({
        method: 'post',
        url: '/fhir/Encounter',
        data: this.patientResource,
      })
        .then((r) => r.data)
        .catch((e) => console.log(e))

      const listResource = { ...this.listResource }
      listResource.encounter.reference = listResource.encounter.reference.replace(
        '{encounterId}',
        encounter.id
      )

      await this.$axios({
        method: 'post',
        url: '/fhir/List',
        data: listResource,
      }).catch((e) => console.log(e))

      this.form.isSaving = false
    },
    async setPatientDetails(id) {
      const response = await this.$axios({
        method: 'get',
        url: `/fhir/Patient/${id}`,
      }).then((r) => r.data)
      this.patient.name = response?.name?.[0]?.text
    },
  },
  async mounted() {
    this.loading = true
    await this.setPatientDetails(this.patientId)
    this.loading = false
  },
}
</script>
