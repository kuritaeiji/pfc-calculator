<template>
  <v-card-text class="grey--text font-weight-bold">
    <div class="text-subtitle-1">
      {{ $t(`model.body.${dataName}`) }}
    </div>
    <div class="text-h5 d-flex">
      <span v-show="!isEditing">{{ data }}{{ $t(`unit.${dataName}`) }}</span>
      <v-form v-show="isEditing" ref="form" @submit.prevent>
        <v-text-field v-model.number="_updatingData" :rules="rules" @keyup.enter="finishEdit" />
      </v-form>
      <v-btn icon color="grey" class="ml-3" @click="startEdit">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </div>
  </v-card-text>
</template>

<script>
import { required } from '@/validators/validators'

export default {
  props: {
    dataName: {
      type: String,
      required: true
    },
    data: {
      type: Number,
      required: true
    },
    updatingData: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      isEditing: false,
      rules: [required]
    }
  },
  computed: {
    _updatingData: {
      get () {
        return this.updatingData
      },
      set (value) {
        this.$emit('update:updating-data', value)
      }
    }
  },
  methods: {
    startEdit () {
      this.$emit('startEdit')
      this.isEditing = true
    },
    finishEdit () {
      if (this.$refs.form.validate()) {
        this.$emit('finishEdit')
        this.isEditing = false
      }
    }
  }
}
</script>
