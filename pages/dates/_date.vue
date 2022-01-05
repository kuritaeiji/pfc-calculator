<template>
  <v-container fluid>
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

    <sub-header title="食べた料理一覧" />
    <template v-for="meal of meals">
      <v-card
        :key="`${meal.id}-card`"
        flat
        tile
        max-width="1000"
        class="grey--text pa-3"
      >
        <v-row no-gutters>
          <v-col>
            <div class="text-caption">
              料理
            </div>
            <div class="font-weight-bold text-truncate">
              {{ meal.title }}
            </div>
          </v-col>
          <v-col class="d-none d-sm-block">
            <div class="text-caption">
              {{ $t('model.food.calory') }}
            </div>
            <div class="font-weight-bold text-truncate">
              {{ meal.calory }}kcal
            </div>
          </v-col>
          <v-col class="d-none d-sm-block">
            <div class="text-caption">
              {{ $t('model.food.protein') }}
            </div>
            <div class="font-weight-bold text-truncate">
              {{ meal.protein }}g
            </div>
          </v-col>
          <v-col class="d-none d-sm-block">
            <div class="text-caption">
              {{ $t('model.food.fat') }}
            </div>
            <div class="font-weight-bold text-truncate">
              {{ meal.fat }}g
            </div>
          </v-col>
          <v-col class="d-none d-sm-block">
            <div class="text-caption">
              {{ $t('model.food.carbonhydrate') }}
            </div>
            <div class="font-weight-bold">
              {{ meal.carbonhydrate }}g
            </div>
          </v-col>
          <v-col v-if="isAteFood(meal)" class="d-flex justify-end">
            <edit-dialog @openDialog="editAteFood(meal)" @update="updateAteFoodTemplate">
              <v-tabs :value="currentTab.toString()">
                <v-tab v-for="category of categories" :key="category.id" :href="`#${category.id}`" @click="setCurrentTabTemplate(category)">
                  {{ category.title }}
                </v-tab>
              </v-tabs>

              <v-radio-group v-model="updatingAteFood.foodId" :rules="ateFoodRules.foodId">
                <v-card
                  v-for="food of filteredFoods"
                  :key="food.id"
                  flat
                  tile
                  color="grey lighten-4"
                  class="d-flex grey--text mb-4"
                >
                  <v-card-actions>
                    <v-radio :value="food.id" @click="setAmountLabel(food)" />
                  </v-card-actions>
                  <v-card-title class="font-weight-bold">
                    {{ food.title }}
                  </v-card-title>
                </v-card>
              </v-radio-group>
              <v-text-field v-model.number="updatingAteFood.amount" :label="amountLabel" :rules="ateFoodRules.amount" />
            </edit-dialog>
            <delete-dialog @delete="removeAteFoodTemplate(meal)" />
          </v-col>
        </v-row>
      </v-card>
      <v-divider :key="`${meal.id}-divider`" />
    </template>

    <div class="mb-3" />

    <create-dialog btn-text="食材・料理一覧から追加" @openDialog="openCreateAteFoodDialog" @add="addAteFoodTemplate">
      <v-tabs :value="currentTab.toString()" class="mb-4">
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
            <v-radio :value="food.id" @click="setAmountLabel(food)" />
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
    const updatingAteFood = { ...newAteFood, id: 0 }
    return { date, body, newAteFood, updatingAteFood }
  },
  data () {
    return {
      updatingWeigth: 0,
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
    ...mapGetters('ateFood', ['ateFoodsByDate']),
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
