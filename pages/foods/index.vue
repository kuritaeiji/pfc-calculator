<template>
  <v-container>
    <sub-header :title="title" />

    <v-tabs v-model="tab" background-color="grey lighten-4" centered class="mb-4">
      <v-tab v-for="category of categories" :key="`${category.id}-tab`">
        {{ category.name }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item v-for="category of categories" :key="`${category.id}-tab-item`" transition="false">
        {{ category.name }}
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      title: this.$t('title.foods.index'),
      tab: null
    }
  },
  head () {
    return {
      title: this.title
    }
  },
  computed: {
    ...mapGetters('category', ['categories'])
  }
}
</script>
