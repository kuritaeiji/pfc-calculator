<template>
  <v-container fluid>
    <sub-header :title="date.string" />

    <v-card flat tile max-width="500" class="d-flex mb-4">
      <body-card-text
        data-name="weight"
        :data="body.weight"
        :updating-data.sync="updatingWeight"
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

    <sub-header title="食べた料理一覧" />

    <ate-food-card v-for="meal of meals" :key="meal.id" :meal="meal">
      <v-col v-if="isAteFood(meal)" class="d-flex justify-end">
        <edit-dialog @openDialog="editAteFood(meal)" @update="updateAteFoodTemplate">
          <forms-ate-food
            v-bind.sync="updatingAteFood"
            :amount-label="amountLabel"
            @clickRadio="setAmountLabel"
          />
        </edit-dialog>
        <delete-dialog @delete="removeAteFoodTemplate(meal)" />
      </v-col>
    </ate-food-card>

    <div class="mb-3" />

    <create-dialog btn-text="食材・料理一覧から追加" @openDialog="openCreateAteFoodDialog" @add="addAteFoodTemplate">
      <forms-ate-food
        v-bind.sync="newAteFood"
        :amount-label="amountLabel"
        @clickRadio="setAmountLabel"
      />
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
    const updatingAteFood = { ...newAteFood, id: 0 }
    return { date, body, newAteFood, updatingAteFood }
  },
  data () {
    return {
      updatingWeight: 0,
      updatingFatPercentage: 0,
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
    ...mapGetters('food', ['filteredFoods', 'foodById']),
    ...mapGetters('date', ['ateFoodsByDate']),
    meals () {
      return this.ateFoodsByDate(this.date)
    },
    isAteFood () {
      return (meal) => {
        return Object.prototype.hasOwnProperty.call(meal, 'foodId')
      }
    }
  },
  methods: {
    ...mapActions('body', ['updateWeight', 'updateFatPercentage']),
    ...mapActions('category', ['setCurrentTab']),
    ...mapActions('ateFood', ['addAteFood', 'removeAteFood', 'setCategoryTab', 'updateAteFood']),
    startEditWeight () {
      this.updatingWeight = this.body.weight
    },
    updateWeightTemplate () {
      this.updateWeight({ weight: this.updatingWeight, date: this.date })
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
    setAmountLabel (food) {
      this.amountLabel = this.$t('model.ateFood.amount') + `(${food.unit})`
    },
    addAteFoodTemplate () {
      this.addAteFood({ ateFood: this.newAteFood })
    },
    removeAteFoodTemplate (ateFood) {
      this.removeAteFood({ ateFood })
    },
    editAteFood (ateFood) {
      this.updatingAteFood = { id: ateFood.id, amount: ateFood.amount, dateId: this.date.id, foodId: ateFood.foodId }
      this.setCategoryTab({ ateFood })
      this.setAmountLabel(ateFood)
    },
    updateAteFoodTemplate () {
      this.updateAteFood({ ateFood: this.updatingAteFood })
    }
  }
}
</script>
