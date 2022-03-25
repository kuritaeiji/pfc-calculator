<template>
  <v-container fluid>
    <pfc-day-chart v-if="chartType === 'day'" />
    <pfc-month-chart v-else />

    <chart-radio-button v-model="chartType" :chart-types="chartTypes" />
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      title: this.$t('title.charts.pfc'),
      date: this.$utils.formatDate(new Date()),
      month: this.$utils.formatMonth(new Date()),
      chartType: 'day',
      chartTypes: [
        { label: '1日毎', value: 'day' },
        { label: '1月毎', value: 'month' }
      ]
    }
  },
  head () {
    return {
      title: this.title
    }
  }
}
</script>
