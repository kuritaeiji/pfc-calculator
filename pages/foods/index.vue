<template>
  <v-container>
    <sub-header :title="title" />

    <v-tabs background-color="grey lighten-4" class="mb-4">
      <v-tab v-for="category of categories" :key="category.id" @click="setCurrentTabTemplate(category)">
        {{ category.title }}
      </v-tab>
    </v-tabs>

    <draggable v-bind="dragOptions" :class="dragClass" @start="onStart" @end="onEnd">
      <v-card
        v-for="food of filteredFoods"
        :key="food.id"
        flat
        tile
        max-width="700"
        class="d-flex mb-3"
      >
        <v-card-title class="text-subtitle-1 font-weight-bold grey--text text-truncate">
          {{ food.title }}
        </v-card-title>

        <v-spacer />

        <v-card-actions>
          <edit-dialog @openDialog="openEditDialog(food)" @update="updateFoodTemplate">
            <forms-food
              v-bind.sync="updatingFood"
              :select-items="selectItems"
            />
          </edit-dialog>

          <delete-dialog @delete="removeFoodTemplate(food)" />
        </v-card-actions>
      </v-card>
    </draggable>

    <create-dialog @closeDialog="closeCreateDialog" @add="addFoodTemplate">
      <forms-food
        v-bind.sync="newFood"
        :select-items="selectItems"
      />
    </create-dialog>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import draggable from 'vuedraggable'
import useDraggable from '@/mixins/useDraggable'

const defaultFood = {
  title: '',
  categoryId: 0,
  per: 100,
  unit: 'g',
  calory: 0,
  protein: 0,
  fat: 0,
  carbonhydrate: 0
}

export default {
  components: { draggable },
  extends: useDraggable,
  asyncData ({ store }) {
    const categories = store.getters['category/categories']
    const selectItems = categories.map(c => ({ text: c.name, value: c.id }))
    const defaultCategoryId = categories[0].id
    const newFood = { ...defaultFood, categoryId: defaultCategoryId }
    const updatingFood = { id: 0, ...defaultFood, categoryId: defaultCategoryId }
    store.dispatch('category/setCurentTab', { category: categories[0] })
    return { categories, selectItems, newFood, updatingFood, defaultCategoryId }
  },
  data () {
    return {
      title: this.$t('title.foods.index')
    }
  },
  head () {
    return {
      title: this.title
    }
  },
  computed: {
    ...mapGetters('food', ['filteredFoods']),
    defaultNewFood () {
      return { ...defaultFood, categoryId: this.defaultCategoryId }
    }
  },
  methods: {
    ...mapActions('food', ['sortFoods', 'addFood', 'updateFood', 'removeFood']),
    ...mapActions('category', ['setCurrentTab']),
    changeTab (category) {
      this.tab = category.id
    },
    onEnd (event) {
      this.sortFoods({ oldIndex: event.oldIndex, newIndex: event.newIndex })
      this.isDragging = false
    },
    openEditDialog (food) {
      this.updatingFood = { ...food }
    },
    updateFoodTemplate () {
      this.updateFood({ food: this.updatingFood })
    },
    removeFoodTemplate (food) {
      this.removeFood({ food })
    },
    closeCreateDialog () {
      this.newFood = this.defaultNewFood
    },
    addFoodTemplate () {
      this.addFood({ food: this.newFood })
      this.newFood = this.defaultNewFood
    },
    setCurrentTabTemplate (category) {
      this.setCurrentTab({ category })
    }
  }
}
</script>
