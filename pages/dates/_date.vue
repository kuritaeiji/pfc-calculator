<template>
  <v-container>
    <sub-header :title="date.dating" />

    <v-card flat tile max-width="500" class="d-flex">
      <v-card-text class="grey--text font-weight-bold">
        <div class="text-subtitle-1">
          {{ $t('model.body.weight') }}
        </div>
        <div class="text-h5 d-flex">
          <span v-show="!editingWeight">{{ body.weight }}kg</span>
          <v-text-field v-show="editingWeight" v-model.number="updatingWeigth" :rules="bodyRules" @keyup.enter="updateWeightTemplate" />
          <v-btn icon color="grey" class="ml-3" @click="startEditWeight">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </div>
      </v-card-text>

      <v-card-text class="grey--text font-weight-bold">
        <div class="text-subtitle-1">
          {{ $t('model.body.fatPercentage') }}
        </div>
        <div class="text-h5 d-flex">
          <span v-show="!editingFatPercentage">{{ body.fatPercentage }}%</span>
          <v-text-field v-show="editingFatPercentage" v-model="updatingFatPercentage" :rules="bodyRules" @keyup.enter="updateFatPercentageTemplate" />
          <v-btn icon color="grey" class="ml-3" @click="startEditFatPercentage">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
import { required } from '@/validators/validators'

export default {
  middleware: ['validDate', 'createDate'],
  asyncData ({ params, store }) {
    const date = store.getters['date/findDate'](params.date)
    const body = store.getters['date/body'](date)
    return { date, body }
  },
  data () {
    return {
      editingWeight: false,
      editingFatPercentage: false,
      updatingWeigth: 0,
      updatingFatPercentage: 0,
      bodyRules: [required]
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
      this.editingWeight = true
    },
    updateWeightTemplate () {
      this.updateWeight({ weight: this.updatingWeigth, date: this.date })
      this.editingWeight = false
    },
    startEditFatPercentage () {
      this.updatingFatPercentage = this.body.fatPercentage
      this.editingFatPercentage = true
    },
    updateFatPercentageTemplate () {
      this.updateFatPercentage({ fatPercentage: this.updatingFatPercentage, date: this.date })
      this.editingFatPercentage = false
    }
  }
}
</script>
