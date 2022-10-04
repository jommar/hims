<template>
  <div>
    <CardDefault>
      <template #title>
        <v-icon left>fa-heart-circle-plus</v-icon>
        New Encounter
      </template>
      <div class="row"></div>
    </CardDefault>
    <pre>{{ resource }}</pre>
  </div>
</template>
<script>
export default {
  name: 'EncounterForm',
  props: {
    patientId: { type: String, required: true },
  },
  data() {
    return {
      form: {
        chiefComplaint: null,
        roomNo: null,
      },
    }
  },
  computed: {
    resource() {
      return {
        resourceType: 'Encounter',
        status: 'in-progress',
        diagnosis: [{ use: this.form.chiefComplaint, condition: {} }],
        participant: [{ actor: `Patient/${this.patientId}` }],
        location: [{ status: 'planned', form: { text: this.form.roomNo } }],
      }
    },
  },
}
</script>
