<template>
  <div>
    <v-alert type="error" prominent border="left" colored-border v-if="encounters.length == 0">
      No encounters available
    </v-alert>
    <v-list v-else>
      <v-list-item v-for="(i, index) in encounters" :key="index">
        <v-list-item-content>
          <v-list-item-title> {{ i.id }} | {{ i.status }} </v-list-item-title>
          <v-list-item-subtitle>
            <div class="d-flex flex-wrap">
              <div class="mx-2">
                ROOM: {{ i.location?.[0].location.identifier.value }}
              </div>
              <div class="mx-2">START: {{ i.location?.[0].period.start }}</div>
              <div class="mx-2">END: {{ i.location?.[0].period.end }}</div>
            </div>
            <div class="ma-2">
              Chief Complaint: <b>{{ i.diagnosis?.[0]?.use?.text }}</b>
            </div>
            <div class="d-flex flex-wrap">
              <div class="mx-2">
                <v-icon small left>fa-person-walking-with-cane</v-icon>
                <span>
                  {{
                    searchList({ type: 'PWD', encounter: `Encounter/${i.id}` })
                  }}
                </span>
              </div>
              <div class="mx-2">
                <v-icon small left>fa-wheelchair</v-icon>
                <span>
                  {{
                    searchList({
                      type: 'SENIOR',
                      encounter: `Encounter/${i.id}`,
                    })
                  }}
                </span>
              </div>
              <div class="mx-2">
                <v-icon small left>fa-id-card-clip</v-icon>
                <span>
                  {{
                    searchList({ type: 'SSS', encounter: `Encounter/${i.id}` })
                  }}
                </span>
              </div>
            </div>
          </v-list-item-subtitle>
        </v-list-item-content>
        <div>
          <v-btn
            small
            icon
            color="error"
            @click.prevent="cancelEncounter({ item: i })"
          >
            <v-icon small>fa-trash</v-icon>
          </v-btn>
        </div>
      </v-list-item>
    </v-list>
  </div>
</template>
<script>
export default {
  name: 'EncountersList',
  props: {
    patientId: { type: String, required: true },
  },
  data() {
    return {
      encounters: [],
      includes: [],
    }
  },
  async mounted() {
    await this.fetchEncounters()
  },
  methods: {
    async cancelEncounter({ item }) {
      item.status = 'cancelled'
      await this.$axios({
        method: 'put',
        url: `/fhir/Encounter/${item.id}`,
        data: item,
      })
      await this.fetchEncounters()
    },
    searchList({ type, encounter }) {
      const item = this.includes
        .find((i) => i?.encounter?.reference == encounter)
        ?.entry?.find((i) => i?.item?.display == type)?.item.identifier?.value

      return item
    },
    async fetchEncounters() {
      const response = await this.$axios({
        method: 'get',
        url: `/fhir/Encounter?subject=Patient/${this.patientId}&status:not=cancelled&_revinclude=List:encounter`,
      }).then((r) => r?.data)

      this.encounters = response.entry
        ?.filter((i) => i.search.mode == 'match')
        ?.map((i) => i.resource) || []

      this.includes = response.entry
        ?.filter((i) => i.search.mode == 'include')
        ?.map((i) => i.resource) || []
    },
  },
}
</script>
