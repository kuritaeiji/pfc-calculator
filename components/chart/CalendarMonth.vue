<template>
  <v-menu offset-y>
    <template #activator="{ on, attrs }">
      <v-btn
        depressed
        dark
        color="cyan accent-4"
        class="mb-4"
        v-bind="attrs"
        v-on="on"
      >
        <v-icon left>
          mdi-calendar
        </v-icon>
        <span class="font-weight-bold">月選択</span>
      </v-btn>
    </template>
    <v-date-picker
      v-model="month"
      type="month"
      locale="ja-jp"
      :max="thisMonth"
    />
  </v-menu>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      thisMonth: this.$utils.formatMonth(new Date())
    }
  },
  computed: {
    month: {
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
