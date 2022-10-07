<template>
  <div>
    <v-textarea
      :label="label"
      @input="(val) => $emit('input', val)"
      :dense="dense"
      :outlined="outlined"
      :type="type"
      :rules="rules"
      :hide-details="hideDetails"
      :color="color"
    >
      <template>
        <slot></slot>
      </template>
      <template #append-outer>
        <slot name="append-outer"></slot>
      </template>
      <template #append v-if="icon && !iconPrepend">
        <v-icon>{{ icon }}</v-icon>
      </template>
      <template #prepend v-if="icon && iconPrepend">
        <v-icon left>{{ icon }}</v-icon>
      </template>
    </v-textarea>
  </div>
</template>
<script>
export default {
  name: 'FormTextArea',
  props: {
    icon: String,
    label: String,
    prepend: { type: Boolean, default: false },
    iconPrepend: { type: Boolean, default: false },
    hideSpinButtons: Boolean,
    dense: { type: Boolean, default: true },
    outlined: { type: Boolean, default: true },
    type: { type: String, default: 'text' },
    rules: { type: Object },
    hideDetails: { type: [Boolean, String], default: 'auto' },
    color: { type: String, default: 'tertiary' },
  },
}
</script>
