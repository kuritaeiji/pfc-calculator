<template>
  <div>
    <chart-calendar-month v-model="month" />

    <v-card flat tile max-width="1050" class="d-md-flex pa-4 mb-4">
      <chart-line :chart-data="chartWeightData" css-classes="body-chart" />
      <div class="d-block d-md-none mb-5" />
      <chart-line :chart-data="chartFatPercentageData" css-classes="body-chart" />
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import monthChart from '@/mixins/monthChart'

export default {
  extends: monthChart,
  computed: {
    ...mapGetters('date', ['monthAverageBody']),
    bodyData () {
      return this.labels.map(monthString => this.monthAverageBody(monthString))
    },
    chartWeightData () {
      return {
        labels: this.labels,
        datasets: [
          {
            label: this.$t('model.body.weight'),
            data: this.bodyData.map(body => body.weight),
            fill: false,
            tension: 0
          }
        ]
      }
    },
    chartFatPercentageData () {
      return {
        labels: this.labels,
        datasets: [
          {
            label: this.$t('model.body.fatPercentage'),
            data: this.bodyData.map(body => body.fatPercentage),
            fill: false,
            tension: 0
          }
        ]
      }
    }
  }
}
</script>
