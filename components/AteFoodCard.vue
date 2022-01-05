<template>
  <div>
    <v-card
      flat
      tile
      class="grey--text pa-3"
    >
      <v-row no-gutters>
        <v-col>
          <div class="text-caption">
            料理
          </div>
          <div class="font-weight-bold text-truncate">
            {{ meal.title }}
          </div>
        </v-col>
        <v-col class="d-none d-sm-block">
          <div class="text-caption">
            {{ $t('model.food.calory') }}
          </div>
          <div class="font-weight-bold text-truncate">
            {{ meal.calory }}kcal
          </div>
        </v-col>
        <v-col class="d-none d-sm-block">
          <div class="text-caption">
            {{ $t('model.food.protein') }}
          </div>
          <div class="font-weight-bold text-truncate">
            {{ meal.protein }}g
          </div>
        </v-col>
        <v-col class="d-none d-sm-block">
          <div class="text-caption">
            {{ $t('model.food.fat') }}
          </div>
          <div class="font-weight-bold text-truncate">
            {{ meal.fat }}g
          </div>
        </v-col>
        <v-col class="d-none d-sm-block">
          <div class="text-caption">
            {{ $t('model.food.carbonhydrate') }}
          </div>
          <div class="font-weight-bold">
            {{ meal.carbonhydrate }}g
          </div>
        </v-col>

        <!-- edit-dialogとdelete-dialogのスロット -->
        <slot />
      </v-row>
    </v-card>
    <v-divider />
  </div>
</template>

<script>
export default {
  props: {
    meal: {
      type: Object,
      required: true
    }
  }
}
</script>
