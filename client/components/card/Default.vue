<template>
  <div>
    <v-skeleton-loader
      v-if="loading"
      type="card-avatar, article, actions"
      indeterminate
    />
    <v-card v-else>
      <v-card-title class="secondary--text blue-grey darken-4" v-if="$slots.title">
        <slot name="title"></slot>
      </v-card-title>
      <v-card-text class="pa-4 subtitle-1">
        <slot></slot>
        <slot name="body" v-if="$slots.body"></slot>
      </v-card-text>
      <v-card-actions v-if="$slots.actions" class="grey darken-3">
        <v-spacer></v-spacer>
        <slot name="actions"></slot>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script>
export default {
  name: 'CardDefault',
  props: {
    loading: { type: Boolean, default: false },
  },
}
</script>
