<template>
  <div>
    <v-text-field v-model="_title" :label="$t('model.food.title')" :rules="rules.title" />
    <v-select v-model="_categoryId" :items="selectItems" :label="$t('model.food.categoryId')" :rules="rules.categoryId" />
    <v-text-field v-model.number="_per" :label="$t('model.food.per')" />
    <v-text-field v-model="_unit" :label="$t('model.food.unit')" :rules="rules.unit" />
    <v-text-field v-model.number="_calory" :label="$t('model.food.calory')" />
    <v-text-field v-model.number="_protein" :label="$t('model.food.protein')" />
    <v-text-field v-model.number="_fat" :label="$t('model.food.fat')" />
    <v-text-field v-model.number="_carbonhydrate" :label="$t('model.food.carbonhydrate')" />
  </div>
</template>

<script>
import { required, shorter, select } from '@/validators/validators'

export default {
  props: {
    title: {
      type: String,
      required: true
    },
    categoryId: {
      type: Number,
      required: true
    },
    per: {
      type: Number,
      default: 0
    },
    unit: {
      type: String,
      default: ''
    },
    calory: {
      type: Number,
      default: 0
    },
    protein: {
      type: Number,
      default: 0
    },
    fat: {
      type: Number,
      default: 0
    },
    carbonhydrate: {
      type: Number,
      default: 0
    },
    selectItems: {
      type: Array,
      required: true
    }
  },
  computed: {
    rules () {
      return {
        title: [required, shorter(20)],
        unit: [required, shorter(5)],
        categoryId: [select(this.selectItems)]
      }
    },
    _title: {
      get () {
        return this.title
      },
      set (value) {
        this.$emit('update:title', value)
      }
    },
    _categoryId: {
      get () {
        return this.categoryId
      },
      set (value) {
        this.$emit('update:categoryId', value)
      }
    },
    _per: {
      get () {
        return this.per
      },
      set (value) {
        this.$emit('update:per', value)
      }
    },
    _unit: {
      get () {
        return this.unit
      },
      set (value) {
        this.$emit('update:unit', value)
      }
    },
    _calory: {
      get () {
        return this.calory
      },
      set (value) {
        this.$emit('update:calory', value)
      }
    },
    _protein: {
      get () {
        return this.protein
      },
      set (value) {
        this.$emit('update:p', value)
      }
    },
    _fat: {
      get () {
        return this.fat
      },
      set (value) {
        this.$emit('update:f', value)
      }
    },
    _carbonhydrate: {
      get () {
        return this.carbonhydrate
      },
      set (value) {
        this.$emit('update:c', value)
      }
    }
  }
}
</script>
