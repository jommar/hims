<template>
  <v-list>
    <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact>
      <v-list-item-content>
        <v-list-item-title>
          <v-icon small left>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>
<script>
export default {
  name: 'LayoutsDrawer',
  data() {
    return {
      items: [
        { icon: 'fa-home', title: 'Home', to: '/' },
        { icon: 'fa-users', title: 'Admission', to: '/admission/new' },
        { icon: 'fa-users', title: 'Patients', to: '/patients' },
      ],
    }
  },
}
</script>
