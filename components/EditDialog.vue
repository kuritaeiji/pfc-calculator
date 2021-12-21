<template>
  <div>
    <v-btn icon color="grey" @click="openDialog">
      <v-icon>mdi-pencil</v-icon>
    </v-btn>

    <v-dialog v-model="dialog" max-width="700">
      <v-card flat tile class="pa-4">
        <v-form ref="editForm" @submit.prevent>
          <slot />
          <v-btn block color="primary" @click="update">
            更新
          </v-btn>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dialog: false
    }
  },
  methods: {
    openDialog () {
      this.dialog = true
      this.$emit('openDialog')
    },
    update () {
      this.$emit('update')
    }
  }
}
</script>
