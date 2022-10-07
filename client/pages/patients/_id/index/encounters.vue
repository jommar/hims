<template>
  <v-container fluid>
    <PagesEncountersList :patientId="$route.params.id" />
  </v-container>
</template>
<script>
export default {
  name: 'PatientsEncounters',
  head() {
    return { title: 'Patient Encounters' }
  },
}
</script>
