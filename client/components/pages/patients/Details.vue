<template>
  <v-container>
    <CardDefault :loading="loading">
      <template #title>
        {{ details?.name?.[0]?.text }}
      </template>
      <template #body>
        <div>
          Patient Number: <b>{{ details.id }}</b>
        </div>
        <div class="row">
          <div class="col">
            Mobile No: <b>{{ details?.telecom?.[0]?.value }}</b>
          </div>
          <div class="col">
            Birth Date: <b>{{ details?.birthDate }}</b>
          </div>
          <div class="col">
            Gender: <b>{{ details?.gender }}</b>
          </div>
        </div>
      </template>
    </CardDefault>
  </v-container>
</template>
<script>
export default {
  name: 'PatientsDetails',
  data() {
    return {
      details: {},
      loading: false,
    }
  },
  props: {
    id: { type: String, required: true },
  },
  async mounted() {
    this.loading = true
    this.details = await this.$axios({
      method: 'get',
      url: `/fhir/Patient/${this.id}`,
    }).then((r) => r.data)
    this.loading = false
  },
}
</script>
