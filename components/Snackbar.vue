<template>
  <v-snackbar
    app
    tile
    top
    color="indigo"
    timeout="-1"
    content-class="font-weight-bold white--text"
    :value="snackbar.isShow"
  >
    {{ snackbar.message }}
    <template #action="{ attrs }">
      <v-btn text class="font-weight-bold" v-bind="attrs" @click="resetSnackbar">
        閉じる
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: mapGetters('snackbar', ['snackbar']),
  methods: mapActions('snackbar', ['resetSnackbar'])
}
</script>
