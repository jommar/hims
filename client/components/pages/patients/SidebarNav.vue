<template>
  <v-container fluid>
    <v-list dense>
      <v-list-item :to="i.to" v-for="(i, index) in items" :key="index">
        {{ i.title }}
      </v-list-item>
    </v-list>
  </v-container>
</template>
<script>
export default {
  name: 'PatientsSidebarNav',
  data() {
    return {
      items: [
        {
          title: 'Encounters',
          to: `/patients/${this.$route.params.id}/encounters`,
        },
        {
          title: 'Medications',
          to: `/patients/${this.$route.params.id}/medications`,
        },
        {
          title: 'Procedures',
          to: `/patients/${this.$route.params.id}/procedures`,
        },
      ],
    }
  },
}
</script>
