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
    <v-list v-else class="pa-0">
      <v-list-item
        class="py-3 my-3 border-2"
        :class="getColorByGender(p.resource.gender)"
        v-for="(p, index) in patients"
        :key="index"
      >
        <v-list-item-avatar color="secondary">
          {{ getInitials(p.resource?.name?.[0]) }}
        </v-list-item-avatar>
        <div class="flex-grow-1">
          <div class="title secondary--text">
            {{ p.resource?.name?.[0]?.text }}
          </div>
          <div class="d-flex">
            <div class="col-auto">Gender: {{ p.resource.gender }}</div>
            <div class="col-auto">Birth Date: {{ p.resource.birthDate }}</div>
            <div class="col-auto">Age: {{ getAge(p.resource.birthDate) }}</div>
          </div>
        </div>
        <v-list-item-action>
          <v-btn
            icon
            class="pa-6"
            color="white"
            :to="`/patients/${p.resource.id}`"
          >
            <v-icon>fa-eye</v-icon>
          </v-btn>
        </v-list-item-action>
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
    getAge(date) {
      const now = new Date().getTime()
      const difference = now - new Date(date).getTime()
      const age = {
        day: difference / (1000 * 3600 * 24),
        get year() {
          return Math.floor(this.day / 365)
        },
        get month() {
          return Math.floor(this.day * 0.032855)
        },
        get days() {
          return Math.floor(this.day)
        },
      }
      const currentAge = Object.entries(age).filter((i, index) => index > 0 && i[1] > 0)[0]
      return `${currentAge[1]}${currentAge[0][0]}`
    },
    getColorByGender(gender) {
      return (gender == 'male' ? 'blue' : 'pink') + ' darken-4'
    },
    getInitials(name) {
      return `${name?.given[0].substring(0, 1)}${name?.family.substring(0, 1)}`
    },
  },
}
</script>
