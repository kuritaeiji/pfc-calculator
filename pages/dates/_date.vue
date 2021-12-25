<template>
  <v-container>
    <sub-header :title="date.dating" />

    <v-card flat tile max-width="500" class="d-flex">
      <body-card-text
        data-name="weight"
        :data="body.weight"
        :updating-data.sync="updatingWeigth"
        @startEdit="startEditWeight"
        @finishEdit="updateWeightTemplate"
      />

      <body-card-text
        data-name="fatPercentage"
        :data="body.fatPercentage"
        :updating-data.sync="updatingFatPercentage"
        @startEdit="startEditFatPercentage"
        @finishEdit="updateFatPercentageTemplate"
      />
    </v-card>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  middleware: ['validDate', 'createDate'],
  asyncData ({ params, store }) {
    const date = store.getters['date/findDate'](params.date)
    const body = store.getters['date/body'](date)
    return { date, body }
  },
  data () {
    return {
      updatingWeigth: 0,
      updatingFatPercentage: 0
    }
  },
  head () {
    return {
      title: this.date.dating
    }
  },
  methods: {
    ...mapActions('body', ['updateWeight', 'updateFatPercentage']),
    startEditWeight () {
      this.updatingWeigth = this.body.weight
    },
    updateWeightTemplate () {
      this.updateWeight({ weight: this.updatingWeigth, date: this.date })
    },
    startEditFatPercentage () {
      this.updatingFatPercentage = this.body.fatPercentage
    },
    updateFatPercentageTemplate () {
      this.updateFatPercentage({ fatPercentage: this.updatingFatPercentage, date: this.date })
    }
  }
}
</script>
