<template>
  <v-dialog v-model="dialog" max-width="700" @click:outside="closeDialog">
    <template #activator="{ on, attrs }">
      <utils-add-btn :text="btnText" :attrs="attrs" :on="on" @click="openDialog" />
    </template>

    <v-card flat tile class="pa-4" @submit.prevent>
      <v-form ref="form">
        <slot />
        <v-btn block color="primary" @click="add">
          追加
        </v-btn>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    btnText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      dialog: false
    }
  },
  methods: {
    async openDialog () {
      this.$emit('openDialog')
      await this.$nextTick()
      this.$refs.form.resetValidation()
    },
    closeDialog () {
      this.$emit('closeDialog')
    },
    add () {
      if (this.$refs.form.validate()) {
        this.dialog = false
        this.$emit('add')
      }
    }
  }
}
</script>
