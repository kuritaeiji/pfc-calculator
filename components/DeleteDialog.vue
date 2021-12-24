<template>
  <v-dialog v-model="dialog" max-width="700">
    <template #activator="{ on, attrs }">
      <v-btn icon color="grey" v-bind="attrs" v-on="on">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </template>

    <v-card flat tile class="pa-4">
      <v-card-title>本当に削除しますか?</v-card-title>
      <v-card-actions>
        <v-btn depressed dark color="red" @click="closeDialog">
          いいえ
        </v-btn>
        <v-btn depressed color="primary" @click="deleteTarget">
          はい
        </v-btn>
      </v-card-actions>
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
    deleteTarget () {
      this.$emit('delete')
      this.dialog = false
    },
    closeDialog () {
      this.dialog = false
    }
  }
}
</script>
