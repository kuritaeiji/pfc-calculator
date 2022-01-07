<template>
  <v-container fluid>
    <sub-header :title="date.string" />

    <div class="d-md-flex">
      <v-card flat tile max-width="400" class="d-flex mb-3">
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

      <span class="d-none d-md-inline mr-3" />

      <pfc-card :pfc="pfc" />
    </div>

    <sub-header :title="$t('chart.pfcPie.name')" />
    <v-card v-if="isShowPfcPie" flat tile max-width="400" class="pa-4">
      <chart-pie :chart-data="chartData" :options="options" />
    </v-card>

    <div class="mb-3" />

    <sub-header title="食べた料理一覧" />

    <meal-card v-for="meal of meals" :key="`${meal.id}-${meal.title}`" :meal="meal">
      <v-col v-if="isAteFood(meal)" class="d-flex justify-end">
        <edit-dialog @openDialog="editAteFood(meal)" @update="updateAteFoodTemplate">
          <forms-ate-food
            v-bind.sync="updatingAteFood"
            :amount-label="amountLabel"
            @clickRadio="setAmountLabel"
          />
        </edit-dialog>
        <span class="mr-3" />
        <delete-dialog @delete="removeAteFoodTemplate(meal)" />
      </v-col>

      <v-col v-else class="d-flex justify-end">
        <edit-dialog @openDialog="editDish(meal)" @update="updateDishTemplate">
          <forms-dish v-bind.sync="updatingDish" />
        </edit-dialog>
        <span class="mr-3" />
        <delete-dialog @delete="removeDishTemplate(meal)" />
      </v-col>
    </meal-card>

    <div class="mb-3" />

    <create-dialog btn-text="食材・料理一覧から追加" @openDialog="openCreateAteFoodDialog" @add="addAteFoodTemplate">
      <forms-ate-food
        v-bind.sync="newAteFood"
        :amount-label="amountLabel"
        @clickRadio="setAmountLabel"
      />
    </create-dialog>

    <div class="mr-3 d-none d-sm-inline" />
    <div class="mb-3 d-block d-sm-none" />

    <create-dialog btn-text="料理を追加" @openDialog="openCreateDishDialog" @add="addDishTemplate">
      <forms-dish v-bind.sync="newDish" />
    </create-dialog>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import pfcChart from '@/mixins/pfcChart'

export default {
  extends: pfcChart,
  middleware: ['validDate', 'createDate'],
  asyncData ({ params, store }) {
    const date = store.getters['date/findDate'](params.date)
    const body = store.getters['date/body'](date)
    const newAteFood = { amount: 0, dateId: date.id, foodId: null }
    const updatingAteFood = { ...newAteFood, id: 0 }
    const newDish = { title: '', calory: 0, protein: 0, fat: 0, carbonhydrate: 0, dateId: date.id }
    const updatingDish = { ...newDish, id: 0 }
    return { date, body, newAteFood, updatingAteFood, newDish, updatingDish }
  },
  data () {
    return {
      updatingWeight: 0,
      updatingFatPercentage: 0,
      amountLabel: this.$t('model.ateFood.amount')
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
    ...mapGetters('date', ['ateFoodsByDate', 'dishesByDate', 'pfcByDate']),
    meals () {
      return [...this.ateFoodsByDate(this.date), ...this.dishesByDate(this.date)]
    },
    isAteFood () {
      return (meal) => {
        return Object.prototype.hasOwnProperty.call(meal, 'foodId')
      }
    },
    pfc () {
      return this.pfcByDate(this.date)
    },
    isShowPfcPie () {
      return this.pfc.protein || this.pfc.fat || this.pfc.carbonhydrate
    }
  },
  methods: {
    ...mapActions('body', ['updateWeight', 'updateFatPercentage']),
    ...mapActions('category', ['setCurrentTab']),
    ...mapActions('ateFood', ['addAteFood', 'removeAteFood', 'setCategoryTab', 'updateAteFood']),
    ...mapActions('dish', ['addDish', 'updateDish', 'removeDish']),
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
    openCreateDishDialog () {
      this.newDish = { title: '', calory: 0, protein: 0, fat: 0, carbonhydrate: 0, dateId: this.date.id }
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
    addDishTemplate () {
      this.addDish({ dish: this.newDish })
    },
    removeAteFoodTemplate (ateFood) {
      this.removeAteFood({ ateFood })
    },
    removeDishTemplate (dish) {
      this.removeDish({ dish })
    },
    editAteFood (ateFood) {
      this.updatingAteFood = { id: ateFood.id, amount: ateFood.amount, dateId: this.date.id, foodId: ateFood.foodId }
      this.setCategoryTab({ ateFood })
      this.setAmountLabel(ateFood)
    },
    editDish (dish) {
      this.updatingDish = { ...dish }
    },
    updateAteFoodTemplate () {
      this.updateAteFood({ ateFood: this.updatingAteFood })
    },
    updateDishTemplate () {
      this.updateDish({ dish: this.updatingDish })
    }
  }
}
</script>
