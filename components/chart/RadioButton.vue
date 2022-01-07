<template>
  <v-radio-group v-model="chartType" row class="grey--text font-weight-bold">
    <v-radio
      v-for="type of chartTypes"
      :key="type.value"
      off-icon="mdi-checkbox-blank-outline"
      on-icon="mdi-checkbox-marked"
      :label="type.label"
      :value="type.value"
    />
  </v-radio-group>
</template>

<script>
export default {
  props: {
    chartTypes: {
      type: Array,
      required: true
    },
    value: {
      type: String,
      required: true
    }
  },
  computed: {
    chartType: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    }
  }
}
</script>
