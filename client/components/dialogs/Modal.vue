<template>
  <div>
    <v-dialog v-model="isOpen" persistent v-if="isOpen">
      <slot></slot>
    </v-dialog>
  </div>
</template>
<script>
export default {
  name: 'DialogsModal',
  props: {
    isOpen: { type: Boolean, default: false },
  },
}
</script>
