<template>
  <div>
    <v-text-field v-model="_title" :label="$t('model.dish.title')" :rules="dishRules.title" />
    <v-text-field v-model.number="_calory" :label="$t('model.dish.calory')" :rules="dishRules.pfc" />
    <v-text-field v-model.number="_protein" :label="$t('model.dish.protein')" :rules="dishRules.pfc" />
    <v-text-field v-model.number="_fat" :label="$t('model.dish.fat')" :rules="dishRules.pfc" />
    <v-text-field v-model.number="_carbonhydrate" :label="$t('model.dish.carbonhydrate')" :rules="dishRules.pfc" />
  </div>
</template>

<script>
import { required, bigger, decimalPoint, shorter } from '@/validators/validators'

export default {
  props: {
    title: {
      type: String,
      required: true
    },
    calory: {
      type: Number,
      required: true
    },
    protein: {
      type: Number,
      required: true
    },
    fat: {
      type: Number,
      required: true
    },
    carbonhydrate: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      dishRules: {
        title: [required, shorter(20)],
        pfc: [required, bigger(0), decimalPoint(2)]
      }
    }
  },
  computed: {
    _title: {
      get () {
        return this.title
      },
      set (value) {
        this.$emit('update:title', value)
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
        this.$emit('update:protein', value)
      }
    },
    _fat: {
      get () {
        return this.fat
      },
      set (value) {
        this.$emit('update:fat', value)
      }
    },
    _carbonhydrate: {
      get () {
        return this.carbonhydrate
      },
      set (value) {
        this.$emit('update:carbonhydrate', value)
      }
    }
  }
}
</script>
