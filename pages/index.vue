<template>
  <v-container fluid>
    <sub-header title="直近10日間のデータ" />

    <v-card flat tile max-width="900" color="grey lighten-4">
      <template v-for="(bodyPfc, index) of bodyPfcs">
        <v-card :key="`${index}-card`" flat tile :to="bodyPfc.to" class="grey--text font-weight-bold pa-3">
          <v-row no-gutters>
            <v-col cols="3" :sm="true">
              <div class="text-caption">
                日付
              </div>
              <div class="text-truncate">
                {{ bodyPfc.date }}
              </div>
            </v-col>
            <v-col cols="3" :sm="true">
              <div class="text-caption">
                {{ $t('model.body.weight') }}
              </div>
              <div class="text-truncate">
                {{ bodyPfc.weight }}{{ $t('unit.weight') }}
              </div>
            </v-col>
            <v-col cols="3" :sm="true">
              <div class="text-caption">
                {{ $t('model.body.fatPercentage') }}
              </div>
              <div class="text-truncate">
                {{ bodyPfc.fatPercentage }}{{ $t('unit.fatPercentage') }}
              </div>
            </v-col>
            <v-col cols="3" :sm="true">
              <div class="text-caption">
                {{ $t('model.date.calory') }}
              </div>
              <div class="text-truncate">
                {{ bodyPfc.calory }}{{ $t('unit.calory') }}
              </div>
            </v-col>
            <v-col cols="3" :sm="true">
              <div class="text-caption">
                {{ $t('model.date.protein') }}
              </div>
              <div class="text-truncate">
                {{ bodyPfc.protein }}{{ $t('unit.protein') }}
              </div>
            </v-col>
            <v-col cols="3" :sm="true">
              <div class="text-caption">
                {{ $t('model.date.fat') }}
              </div>
              <div class="text-truncate">
                {{ bodyPfc.fat }}{{ $t('unit.fat') }}
              </div>
            </v-col>
            <v-col cols="3" :sm="true">
              <div class="text-caption">
                {{ $t('model.date.carbonhydrate') }}
              </div>
              <div class="text-truncate">
                {{ bodyPfc.carbonhydrate }}{{ $t('unit.carbonhydrate') }}
              </div>
            </v-col>
          </v-row>
        </v-card>

        <v-divider :key="`${index}-divider`" />
      </template>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import dayChart from '~/mixins/dayChart'

export default {
  extends: dayChart,
  head () {
    return {
      title: this.$t('title.index')
    }
  },
  computed: {
    ...mapGetters('date', ['findDate', 'body', 'pfcByDate']),
    dates () {
      const labels = this.labels
      return labels.reverse()
    },
    bodyPfcs () {
      return this.dates.map((dateString) => {
        const date = this.findDate(dateString)
        const formattedDate = this.$utils.formatOnlyMonthDay(new Date(dateString))
        const to = `/dates/${dateString}`
        if (date) {
          return { date: formattedDate, ...this.body(date), ...this.pfcByDate(date), to }
        }
        return { date: formattedDate, weight: 0, fatPercentage: 0, calory: 0, protein: 0, fat: 0, carbonhydrate: 0, to }
      })
    }
  }
}
</script>
