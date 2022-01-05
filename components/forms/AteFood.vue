<template>
  <div>
    <v-tabs :value="currentTab.toString()">
      <v-tab v-for="category of categories" :key="category.id" :href="`#${category.id}`" @click="clickTab(category)">
        {{ category.title }}
      </v-tab>
    </v-tabs>
    <v-radio-group v-model="_foodId" :rules="ateFoodRules.foodId">
      <v-card
        v-for="food of filteredFoods"
        :key="food.id"
        flat
        tile
        color="grey lighten-4"
        class="d-flex grey--text mb-4"
      >
        <v-card-actions>
          <v-radio :value="food.id" @click="clickRadio(food)" />
        </v-card-actions>
        <v-card-title class="font-weight-bold">
          {{ food.title }}
        </v-card-title>
      </v-card>
    </v-radio-group>
    <v-text-field v-model.number="_amount" :label="amountLabel" :rules="ateFoodRules.amount" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { required, bigger, decimalPoint } from '@/validators/validators'

export default {
  props: {
    amountLabel: {
      type: String,
      required: true
    },
    foodId: {
      type: Number,
      required: true
    },
    amount: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      ateFoodRules: {
        amount: [required, bigger(0), decimalPoint(2)],
        foodId: [required]
      }
    }
  },
  computed: {
    ...mapGetters('category', ['currentTab', 'categories']),
    ...mapGetters('food', ['filteredFoods']),
    _foodId: {
      get () {
        return this.foodId
      },
      set (value) {
        this.$emit('update:foodId', value)
      }
    },
    _amount: {
      get () {
        return this.amount
      },
      set (value) {
        this.$emit('update:amount', value)
      }
    }
  },
  methods: {
    ...mapActions('category', ['setCurrentTab']),
    clickRadio (food) {
      this.$emit('clickRadio', food)
    },
    clickTab (category) {
      this.setCurrentTab({ category })
    }
  }
}
</script>
