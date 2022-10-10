<template>
  <div>
    <div class="d-flex align-center mb-8">
      <v-form
        class="mx-8 flex-grow-1 d-flex align-center"
        @submit.prevent="searchPatient"
      >
        <FormTextField
          dense
          label="Last Name"
          v-model="patients.search.last"
          class="mr-2 flex-grow-1"
        />
        <FormTextField
          dense
          label="First Name"
          v-model="patients.search.first"
          class="mx-2 flex-grow-1"
        />
        <FormTextField
          dense
          label="Middle Name"
          v-model="patients.search.middle"
          class="mx-2 flex-grow-1"
        />
        <v-btn
          type="submit"
          color="primary"
          class="ml-2"
          rounded
          fab
          small
          :loading="patients.isLoading"
        >
          <v-icon>fa-search</v-icon>
        </v-btn>
      </v-form>
      <v-btn to="/patients/create" color="primary">
        <v-icon left>fa-plus-circle</v-icon>
        New Patient
      </v-btn>
    </div>
    <DialogsModal :isOpen="isCreatingPatient">
      <v-card color="grey darken-4">
        <NuxtChild ref="createPatient" />
        <v-card-actions class="text-right grey darken-3">
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            @click="$refs.createPatient.save()"
            :loading="$refs?.createPatient?.loading || false"
          >
            <v-icon left>fa-save</v-icon>
            Save
          </v-btn>
          <v-btn
            color="error"
            @click="$router.go(-1)"
            :loading="$refs?.createPatient?.loading || false"
          >
            <v-icon left>fa-times-circle</v-icon>
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </DialogsModal>
    <SpinnerCenter v-if="patients.isLoading" />
    <div v-else>
      <PagesPatientsList class="mx-10" :patients="patients.list" />
    </div>
  </div>
</template>
<script>
export default {
  name: 'PatientList',
  head() {
    return { title: 'Patient List' }
  },
  computed: {
    isCreatingPatient() {
      return this.$route.path == '/patients/create'
    },
  },
  data() {
    return {
      patients: {
        isLoading: false,
        list: [],
        search: {
          last: '',
          first: '',
          middle: '',
        },
      },
    }
  },
  methods: {
    async searchPatient() {
      this.patients.isLoading = true
      this.patients.list = await this.$axios({
        method: 'get',
        url: `/fhir/Patient?family:contains=${this.patients.search.last}&given:contains=${this.patients.search.first}&name:contains=${this.patients.search.middle}`,
      }).then((r) => r.data?.entry)
      this.patients.isLoading = false
    },
  },
  async mounted() {
    this.patients.isLoading = true
    this.patients.list = await this.$axios({
      method: 'get',
      url: '/fhir/Patient?active=true',
    }).then((r) => r.data?.entry)
    this.patients.isLoading = false
  },
}
</script>
