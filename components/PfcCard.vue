<template>
  <v-card flat tile max-width="700" class="d-flex flex-wrap flex-sm-nowrap mb-4 text-no-wrap">
    <v-card-text class="grey--text font-weight-bold">
      <div class="text-subtitle-1">
        {{ $t('model.date.calory') }}
      </div>
      <div class="text-h5">
        {{ pfc.calory }}{{ $t('unit.calory') }}
      </div>
    </v-card-text>
    <v-card-text class="grey--text font-weight-bold">
      <div class="text-subtitle-1">
        {{ $t('model.date.protein') }}
      </div>
      <div class="text-h5">
        {{ pfc.protein }}{{ $t('unit.protein') }}
      </div>
    </v-card-text>
    <v-card-text class="grey--text font-weight-bold">
      <div class="text-subtitle-1">
        {{ $t('model.date.fat') }}
      </div>
      <div class="text-h5">
        {{ pfc.fat }}{{ $t('unit.fat') }}
      </div>
    </v-card-text>
    <v-card-text class="grey--text font-weight-bold">
      <div class="text-subtitle-1">
        {{ $t('model.date.carbonhydrate') }}
      </div>
      <div class="text-h5">
        {{ pfc.carbonhydrate }}{{ $t('unit.carbonhydrate') }}
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    pfc: {
      type: Object,
      required: true
    }
  }
}
</script>
