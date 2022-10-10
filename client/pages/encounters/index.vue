<template>
  <div>
    <PagesEncountersForm v-if="isNew" :patientId="$route.query.patient" />
  </div>
</template>
<script>
export default {
  name: 'Encounters',
  computed: {
    isNew() {
      return this.$route.query?.new == 'true'
    },
  },
}
</script>
