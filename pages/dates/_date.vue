<template>
  <v-container>
    <sub-header :title="title" />

    <v-card flat tile max-width="500" class="d-flex">
      <v-card-text class="grey--text font-weight-bold">
        <div class="text-subtitle-1">
          {{ $t('model.body.weight') }}
        </div>
        <div class="text-h5 d-flex">
          {{ body.weight }}kg
          <v-btn icon color="grey" class="ml-3">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </div>
      </v-card-text>

      <v-card-text class="grey--text font-weight-bold">
        <div class="text-subtitle-1">
          {{ $t('model.body.fatPercentage') }}
        </div>
        <div class="text-h5 d-flex">
          {{ body.fatPercentage }}%
          <v-btn icon color="grey" class="ml-3">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  middleware: ['validDate', 'createDate'],
  asyncData ({ params, store }) {
    const date = store.getters['date/findDate'](params.date)
    const body = store.getters['date/body'](date)
    return { title: date.dating, body }
  },
  head () {
    return {
      title: this.title
    }
  }
}
</script>
