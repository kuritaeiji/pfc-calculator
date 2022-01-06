<template>
  <v-container fluid>
    <sub-header :title="title" />

    <body-day-chart v-if="chartType === 'day'" />
    <body-month-chart v-else />

    <v-radio-group v-model="chartType" row class="grey--text font-weight-bold">
      <v-radio
        v-for="type of chartTypes"
        :key="type.value"
        off-icon="mdi-checkbox-blank-outline"
        on-icon="mdi-checkbox-marked"
        :label="type.label"
        :value="type.value"
      />
    </v-radio-group>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      title: this.$t('title.charts.body'),
      chartType: 'day',
      chartTypes: [
        { label: '1日毎', value: 'day' },
        { label: '1月毎', value: 'month' }
      ]
    }
  },
  head () {
    return {
      title: this.title
    }
  }
}
</script>
