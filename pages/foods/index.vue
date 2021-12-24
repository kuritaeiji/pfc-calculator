<template>
  <v-container>
    <sub-header :title="title" />

    <v-tabs background-color="grey lighten-4" class="mb-4">
      <v-tab v-for="category of categories" :key="category.id" @click="changeTab(category)">
        {{ category.name }}
      </v-tab>
    </v-tabs>

    <draggable v-bind="dragOptions" :class="dragClass" @start="onStart" @end="onEnd">
      <v-card
        v-for="food of filteredFoods(tab)"
        :key="food.id"
        flat
        tile
        max-width="700"
        class="d-flex mb-3"
      >
        <v-card-title class="text-subtitle-1 font-weight-bold grey--text text-truncate">
          {{ food.name }}
        </v-card-title>

        <v-spacer />

        <v-card-actions>
          <edit-dialog @openDialog="openEditDialog(food)" @update="updateFoodTemplate">
            <v-text-field v-model="updatingFood.name" :label="$t('model.food.name')" autofocus :rules="rules.name" />
            <v-select v-model="updatingFood.categoryId" :items="selectItems" :label="$t('model.food.categoryId')" />
            <v-text-field v-model.number="updatingFood.per" :label="$t('model.food.per')" />
            <v-text-field v-model="updatingFood.unit" :label="$t('model.food.unit')" :rules="rules.unit" />
            <v-text-field v-model.number="updatingFood.calory" :label="$t('model.food.calory')" />
            <v-text-field v-model.number="updatingFood.p" :label="$t('model.food.p')" />
            <v-text-field v-model.number="updatingFood.f" :label="$t('model.food.f')" />
            <v-text-field v-model.number="updatingFood.c" :label="$t('model.food.c')" />
          </edit-dialog>

          <delete-dialog />
        </v-card-actions>
      </v-card>
    </draggable>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import draggable from 'vuedraggable'
import useDraggable from '@/mixins/useDraggable'
import { required, shorter } from '@/validators/validators'

export default {
  components: { draggable },
  extends: useDraggable,
  asyncData ({ store }) {
    const categories = store.getters['category/categories']
    const selectItems = categories.map(c => ({ text: c.name, value: c.id }))
    return { tab: categories[0].id, categories, selectItems }
  },
  data () {
    return {
      title: this.$t('title.foods.index'),
      updatingFood: {
        id: 0,
        name: '',
        categoryId: 0,
        per: 0,
        unit: '',
        calory: 0,
        p: 0,
        f: 0,
        c: 0
      },
      rules: {
        name: [required, shorter(20)],
        unit: [required, shorter(5)]
      }
    }
  },
  head () {
    return {
      title: this.title
    }
  },
  computed: mapGetters('food', ['filteredFoods']),
  methods: {
    ...mapActions('food', ['sortFoods', 'updateFood']),
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
    }
  }
}
</script>
