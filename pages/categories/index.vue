<template>
  <v-container>
    <sub-header :title="title" />

    <draggable v-model="categories" v-bind="dragOptions" :class="dragClass" @start="onStart" @end="onEnd">
      <v-card
        v-for="category of categories"
        :key="category.id"
        flat
        tile
        max-width="700"
        class="d-flex mb-3"
      >
        <v-card-title class="text-subtitle-1 font-weight-bold grey--text text-truncate">
          {{ category.title }}
        </v-card-title>

        <v-spacer />

        <v-card-actions>
          <edit-dialog @openDialog="openEditDialog(category)" @update="updateCategoryTemplate">
            <v-text-field v-model="updatingCategory.title" autofocus :label="$t('model.category.title')" :rules="rules" />
          </edit-dialog>

          <delete-dialog @delete="removeCategoryTemplate(category)" />
        </v-card-actions>
      </v-card>
    </draggable>

    <create-dialog @closeDialog="closeCreateDialog" @add="addCategoryTemplate">
      <v-text-field v-model="newCategory.title" autofocus :label="$t('model.category.title')" :rules="rules" />
    </create-dialog>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
import draggable from 'vuedraggable'
import { required, shorter } from '@/validators/validators'
import useDraggable from '@/mixins/useDraggable'

export default {
  components: { draggable },
  extends: useDraggable,
  data () {
    return {
      title: this.$t('title.categories.index'),
      updatingCategory: {
        id: null,
        title: ''
      },
      newCategory: {
        title: ''
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
  computed: {
    categories: {
      get () {
        return this.$store.getters['category/categories']
      },
      set (value) {
        this.setCategories({ categories: value })
      }
    }
  },
  methods: {
    ...mapActions('category', ['addCategory', 'removeCategory', 'updateCategory', 'setCategories']),
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
      this.newCategory.title = ''
    }
  }
}
</script>
