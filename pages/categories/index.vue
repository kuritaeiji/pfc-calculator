<template>
  <v-container>
    <sub-header :title="title" />

    <v-card
      v-for="category of categories"
      :key="category.id"
      flat
      tile
      max-width="700"
      class="d-flex mb-3"
    >
      <v-card-title class="text-subtitle-1 font-weight-bold grey--text text-truncate">
        {{ category.name }}
      </v-card-title>

      <v-spacer />

      <v-card-actions>
        <edit-dialog @openDialog="openEditDialog(category)" @update="updateCategoryTemplate">
          <v-text-field v-model="updatingCategory.name" :label="$t('model.category.name')" />
        </edit-dialog>

        <delete-dialog @delete="removeCategoryTemplate(category)" />
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      title: this.$t('title.categories.index'),
      dialog: false,
      updatingCategory: {
        id: null,
        name: ''
      }
    }
  },
  head () {
    return {
      title: this.title
    }
  },
  computed: mapGetters('category', ['categories']),
  methods: {
    ...mapActions('category', ['removeCategory', 'updateCategory']),
    removeCategoryTemplate (category) {
      this.removeCategory({ category })
    },
    updateCategoryTemplate () {
      this.updateCategory({ category: this.updatingCategory })
      this.dialog = false
    },
    openEditDialog (category) {
      this.updatingCategory = { ...this.updatingCategory, ...category }
      this.dialog = true
    }
  }
}
</script>
