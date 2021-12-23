<template>
  <v-container>
    <sub-header :title="title" />

    <v-tabs background-color="grey lighten-4" centered class="mb-4">
      <v-tab v-for="category of categories" :key="category.id" @click="changeTab(category)">
        {{ category.name }}
      </v-tab>
    </v-tabs>

    <v-card v-for="food of filteredFoods(tab)" :key="food.id" flat tile max-width="700">
      {{ food.name }}
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  asyncData ({ store }) {
    const categories = store.getters['category/categories']
    return { tab: categories[0].id, categories }
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
  computed: mapGetters('food', ['filteredFoods']),
  methods: {
    changeTab (category) {
      this.tab = category.id
    }
  }
}
</script>
