<template>
  <v-container>
    <sub-header :title="date.string" />

    <v-card flat tile max-width="500" class="d-flex mb-4">
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

    <create-dialog btn-text="食材・料理一覧から追加" @openDialog="openCreateAteFoodDialog" @add="addAteFoodTemplate">
      <v-tabs :value="currentTab" class="mb-4">
        <v-tab v-for="category of categories" :key="category.id" :href="`#${category.id}`" @click="setCurrentTabTemplate(category)">
          {{ category.title }}
        </v-tab>
      </v-tabs>
      <v-radio-group v-model="newAteFood.foodId" :rules="ateFoodRules.foodId">
        <v-card
          v-for="food of filteredFoods"
          :key="food.id"
          flat
          tile
          color="grey lighten-4"
          class="d-flex grey--text mb-4"
        >
          <v-card-actions>
            <v-radio :value="food.id" @click="selectFood(food)" />
          </v-card-actions>
          <v-card-title class="font-weight-bold">
            {{ food.title }}
          </v-card-title>
        </v-card>
      </v-radio-group>
      <v-text-field v-model.number="newAteFood.amount" :label="amountLabel" :rules="ateFoodRules.amount" />
    </create-dialog>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { required, bigger, decimalPoint } from '@/validators/validators'

export default {
  middleware: ['validDate', 'createDate'],
  asyncData ({ params, store }) {
    const date = store.getters['date/findDate'](params.date)
    const body = store.getters['date/body'](date)
    const newAteFood = { amount: 0, dateId: date.id, foodId: null }
    return { date, body, newAteFood }
  },
  data () {
    return {
      updatingWeigth: 0,
      updatingFatPercentage: 0,
      createAteFoodDialog: false,
      amountLabel: this.$t('model.ateFood.amount'),
      ateFoodRules: {
        amount: [required, bigger(0), decimalPoint(2)],
        foodId: [required]
      }
    }
  },
  head () {
    return {
      title: this.date.string
    }
  },
  computed: {
    ...mapGetters('category', ['categories', 'currentTab']),
    ...mapGetters('food', ['filteredFoods'])
  },
  methods: {
    ...mapActions('body', ['updateWeight', 'updateFatPercentage']),
    ...mapActions('category', ['setCurrentTab']),
    ...mapActions('ateFood', ['addAteFood']),
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
    },
    openCreateAteFoodDialog () {
      this.newAteFood = { amount: 0, dateId: this.date.id, foodId: null }
      this.amountLabel = this.$t('model.ateFood.amount')
      this.setCurrentTab({ category: this.categories[0] })
    },
    setCurrentTabTemplate (category) {
      this.setCurrentTab({ category })
    },
    selectFood (food) {
      this.amountLabel = this.$t('model.ateFood.amount') + `(${food.unit})`
    },
    addAteFoodTemplate () {
      this.addAteFood({ ateFood: this.newAteFood })
    }
  }
}
</script>
