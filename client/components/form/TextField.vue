<template>
  <div>
    <v-text-field
      :label="label"
      @input="(val) => $emit('input', val)"
      v-bind="attrs"
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
        <v-icon right>{{ icon }}</v-icon>
      </template>
      <template #prepend v-if="icon && iconPrepend">
        <v-icon left>{{ icon }}</v-icon>
      </template>
    </v-text-field>
  </div>
</template>
<script>
export default {
  name: 'FormTextField',
  props: {
    icon: String,
    label: String,
    prepend: { type: Boolean, default: false },
    iconPrepend: { tupe: Boolean, default: false },
    hideSpinButtons: Boolean,
    dense: { type: Boolean, default: false },
    outlined: { type: Boolean, default: true },
    type: { type: String, default: 'text' },
    rules: { type: Object },
    hideDetails: { type: [Boolean, String], default: 'auto' },
    color: { type: String, default: 'tertiary' },
  },
  data() {
    return {
      attrs: {
        outlined: true,
        class: 'ma-0',
      },
    }
  },
}
</script>
