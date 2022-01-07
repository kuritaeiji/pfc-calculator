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
        <span class="font-weight-bold">日付選択</span>
      </v-btn>
    </template>
    <v-date-picker
      v-model="date"
      locale="ja-jp"
      first-day-of-week="1"
      :day-format="(d) => new Date(d).getDate()"
      :max="today"
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
      today: this.$utils.formatDate(new Date())
    }
  },
  computed: {
    date: {
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
