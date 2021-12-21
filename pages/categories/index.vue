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
          <v-text-field v-model="updatingCategory.name" autofocus :label="$t('model.category.name')" :rules="rules" />
        </edit-dialog>

        <delete-dialog @delete="removeCategoryTemplate(category)" />
      </v-card-actions>
    </v-card>

    <create-dialog @closeDialog="closeCreateDialog" @add="addCategoryTemplate">
      <v-text-field v-model="newCategory.name" autofocus :label="$t('model.category.name')" :rules="rules" />
    </create-dialog>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { required, shorter } from '@/validators/validators'

export default {
  data () {
    return {
      title: this.$t('title.categories.index'),
      updatingCategory: {
        id: null,
        name: ''
      },
      newCategory: {
        name: ''
      },
      rules: [
        required,
        shorter(20)
      ]
    }
  },
  head () {
    return {
      title: this.title
    }
  },
  computed: mapGetters('category', ['categories']),
  methods: {
    ...mapActions('category', ['addCategory', 'removeCategory', 'updateCategory']),
    addCategoryTemplate () {
      this.addCategory({ category: this.newCategory })
      this.closeCreateDialog()
    },
    removeCategoryTemplate (category) {
      this.removeCategory({ category })
    },
    updateCategoryTemplate () {
      this.updateCategory({ category: this.updatingCategory })
    },
    openEditDialog (category) {
      this.updatingCategory = { ...this.updatingCategory, ...category }
      this.dialog = true
    },
    closeCreateDialog () {
      this.newCategory.name = ''
    }
  }
}
</script>
