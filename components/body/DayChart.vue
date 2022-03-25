<template>
  <div>
    <chart-calendar-day v-model="date" />

    <v-card flat tile max-width="1050" class="d-md-flex pa-4 mb-4">
      <chart-line :chart-data="chartWeightData" :options="createOptions($t('unit.weight'))" css-classes="body-chart" />
      <div class="d-block d-md-none mb-5" />
      <chart-line :chart-data="chartFatPercentageData" :options="createOptions($t('unit.percentage'))" css-classes="body-chart" />
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import dayChart from '@/mixins/dayChart'
import lineChart from '~/mixins/lineChart'

export default {
  mixins: [dayChart, lineChart],
  computed: {
    ...mapGetters('date', ['findDate', 'body']),
    bodyData () {
      return this.labels.map((dateString) => {
        const date = this.findDate(dateString)
        return date ? this.body(date) : { weight: 0, fatPercentage: 0 }
      })
    },
    chartWeightData () {
      return {
        labels: this.labels,
        datasets: [
          {
            label: this.$t('model.body.weight'),
            data: this.bodyData.map(body => body.weight),
            fill: false,
            tension: 0,
            borderColor: 'red',
            pointBorderColor: 'red',
            pointBackgroundColor: 'red'
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
            borderColor: 'blue',
            pointBorderColor: 'blue',
            pointBackgroundColor: 'blue'
          }
        ]
      }
    }
  }
}
</script>
