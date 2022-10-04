<template>
  <div>
    <v-alert
      v-if="!patients"
      type="error"
      border="left"
      colored-border
      prominent
    >
      No patient available.
    </v-alert>
    <v-list outlined v-else>
      <v-list-item
        class="py-3"
        v-for="(p, index) in patients"
        :key="index"
        :to="`/patients/${p.resource.id}`"
      >
        <v-list-item-avatar color="secondary">
          {{ getInitials(p.resource?.name?.[0]) }}
        </v-list-item-avatar>
        <div style="width: 100%;">
          <div class="title secondary--text">
            {{ p.resource?.name?.[0]?.text }}
          </div>
          <div class="d-flex">
            <div class="col-auto">Gender: {{ p.resource.gender }}</div>
            <div class="col-auto">Birth Date: {{ p.resource.birthDate }}</div>
          </div>
        </div>
      </v-list-item>
    </v-list>
  </div>
</template>
<script>
export default {
  name: 'PatientsList',
  props: {
    patients: Array,
  },
  methods: {
    getInitials(name) {
      return `${name?.given[0].substring(0, 1)}${name?.family.substring(0, 1)}`
    },
  },
}
</script>
