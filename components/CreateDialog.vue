<template>
  <v-dialog v-model="dialog" @click:outside="closeDialog">
    <template #activator="{ on, attrs }">
      <v-btn
        large
        depressed
        dark
        max-width="700"
        color="light-blue lighten-2"
        class="font-weight-bold"
        v-bind="attrs"
        v-on="on"
      >
        <v-icon left>
          mdi-plus-thick
        </v-icon>
        カテゴリー追加
      </v-btn>
    </template>

    <v-card flat tile class="pa-4" @submit.prevent>
      <v-form ref="createForm">
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
  data () {
    return {
      dialog: false
    }
  },
  methods: {
    closeDialog () {
      this.$emit('closeDialog')
    },
    add () {
      this.dialog = false
      this.$emit('add')
    }
  }
}
</script>
