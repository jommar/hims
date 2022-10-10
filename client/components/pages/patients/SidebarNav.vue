<template>
  <v-container fluid>
    <v-list dense class="pa-0 transparent">
      <v-list-item
        class="my-1 primary darken-4 rounded"
        v-for="(i, index) in items"
        :key="index"
        :to="i.to"
      >
        <v-list-item-avatar>
          <v-icon>{{ i.icon }}</v-icon>
        </v-list-item-avatar>
        <div class="flex-grow-1">
          {{ i.title }}
        </div>
        <v-list-item-action>
          <v-btn icon :to="`/encounters?new=true&patient=${$route.params.id}`">
            <v-icon>fa-plus-circle</v-icon>
          </v-btn>
        </v-list-item-action>
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
          icon: 'fa-notes-medical',
        },
        {
          title: 'Medications',
          to: `/patients/${this.$route.params.id}/medications`,
          icon: 'fa-pills',
        },
        {
          title: 'Procedures',
          to: `/patients/${this.$route.params.id}/procedures`,
          icon: 'fa-hospital',
        },
      ],
    }
  },
  methods: {
    newResource(item) {
      console.log(item)
    },
  },
}
</script>
