<template>
  <div>
    <chart-calendar-day v-model="date" />

    <v-card flat tile max-width="1050" class="d-md-flex pa-4 mb-4">
      <chart-line :chart-data="caloryData" :options="createOptions('calory')" css-classes="body-chart" />
      <div class="d-block d-md-none mb-5" />
      <chart-line :chart-data="proteinData" :options="createOptions('protein')" css-classes="body-chart" />
    </v-card>

    <v-card flat tile max-width="1050" class="d-md-flex pa-4 mb-4">
      <chart-line :chart-data="fatData" :options="createOptions('fat')" css-classes="body-chart" />
      <div class="d-block d-md-none mb-5" />
      <chart-line :chart-data="carbonhydrateData" :options="createOptions('carbonhydrate')" css-classes="body-chart" />
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import dayChart from '@/mixins/dayChart'
import pfcLineChart from '~/mixins/pfcLineChart'

export default {
  mixins: [dayChart, pfcLineChart],
  computed: {
    ...mapGetters('date', ['pfcByDate', 'findDate']),
    pfcs () {
      return this.labels.map((dateString) => {
        const date = this.findDate(dateString)
        return date ? this.pfcByDate(date) : { calory: 0, protein: 0, fat: 0, carbonhydrate: 0 }
      })
    }
  }
}
</script>
