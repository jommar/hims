<template>
  <v-container fluid>
    <div class="title secondary--text mb-8">
      <v-icon left color="secondary">fa-user-plus</v-icon>
      New Patient
    </div>
    <v-form>
      <div class="row">
        <v-text-field class="col" v-model="form.lastName" label="Last Name" />
        <v-text-field class="col" v-model="form.firstName" label="First Name" />
        <v-text-field
          class="col"
          v-model="form.middleName"
          label="Middle Name"
        />
      </div>
      <div class="row">
        <v-select
          class="col"
          :items="gender"
          v-model="form.gender"
          label="Gender"
        />
        <v-text-field
          class="col"
          type="date"
          v-model="form.birthdate"
          label="Birth Date"
        />
        <v-text-field
          class="col"
          label="Mobile Number"
          v-model="form.mobileno"
        />
      </div>
    </v-form>
  </v-container>
</template>
<script>
export default {
  name: 'PatientsCreate',
  computed: {
    resource() {
      return {
        resourceType: 'Patient',
        name: {
          family: this.form.lastName || '',
          given: [this.form.firstName || '', this.form.middleName || ''],
          text: `${this.form.firstName || ''} ${this.form.lastName || ''} ${
            this.form.middleName || ''
          }`,
        },
        birthDate: this.form.birthdate || '',
        gender: this.form.gender || '',
        telecom: [
          { system: 'phone', value: this.form.mobileno || '', use: 'mobile' },
        ],
        identifier: [{ value: process.env.IDENTIFIER }],
        active: true,
      }
    },
  },
  data() {
    return {
      loading: false,
      form: {
        firstName: null,
        lastName: null,
        middleName: null,
        gender: null,
        birthdate: null,
        mobileno: null,
      },
      gender: [
        { text: 'Male', value: 'male' },
        { text: 'Female', value: 'female' },
      ],
    }
  },
  methods: {
    async save() {
      this.loading = true
      const response = await this.$axios({
        method: 'post',
        url: '/fhir/Patient',
        data: this.resource,
      }).then((r) => r.data)
      this.loading = false

      this.$router.push('/patients')
    },
  },
}
</script>
