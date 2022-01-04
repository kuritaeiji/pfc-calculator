<template>
  <v-btn
    large
    depressed
    dark
    color="light-blue lighten-2"
    class="font-weight-bold"
    v-bind="attrs"
    v-on="on"
    @click="$emit('click')"
  >
    <v-icon left>
      mdi-plus-thick
    </v-icon>
    {{ text }}
  </v-btn>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true
    },
    attrs: {
      type: Object,
      default: null
    },
    on: {
      type: Object,
      default: null
    }
  }
}
</script>
