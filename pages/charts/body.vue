<template>
  <v-container fluid>
    <sub-header :title="title" />

    <body-day-chart v-if="chartType === 'day'" />
    <body-month-chart v-else />

    <chart-radio-button v-model="chartType" :chart-types="chartTypes" />
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      title: this.$t('title.charts.body'),
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
