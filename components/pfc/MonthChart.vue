<template>
  <div>
    <chart-calendar-month v-model="month" />

    <v-card flat tile max-width="1050" class="d-md-flex pa-4 mb-4">
      <chart-line :chart-data="caloryData" :options="createOptions($t('unit.calory'))" css-classes="body-chart" />
      <div class="d-block d-md-none mb-5" />
      <chart-line :chart-data="pfcData" :options="createOptions($t('unit.pfc'))" css-classes="body-chart" />
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import monthChart from '@/mixins/monthChart'
import pfcLineChart from '~/mixins/pfcLineChart'
import lineChart from '~/mixins/lineChart'

export default {
  mixins: [monthChart, pfcLineChart, lineChart],
  computed: {
    ...mapGetters('date', ['monthAveragePfc']),
    pfcs () {
      return this.labels.map(monthString => this.monthAveragePfc(monthString))
    }
  }
}
</script>
