<template>
  <div>
    <v-app-bar app flat>
      <v-app-bar-nav-icon @click="drawer = !drawer" />

      <v-app-bar-title class="grey--text font-weight-bold text-h5 cp">
        <nuxt-link to="/" tag="div">
          {{ $t('title.index') }}
        </nuxt-link>
      </v-app-bar-title>

      <v-spacer />

      <v-menu offset-y>
        <template #activator="{ on, attrs }">
          <v-btn text color="grey" class="font-weight-bold text-subtitle-1" v-bind="attrs" v-on="on">
            <v-icon left>
              mdi-calendar
            </v-icon>
            日付選択
          </v-btn>
        </template>
        <v-date-picker
          v-model="date"
          locale="ja-jp"
          first-day-of-week="1"
          :day-format="(d) => new Date(d).getDate()"
          @change="change"
        />
      </v-menu>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app hide-overlay dark color="indigo darken-1">
      <v-list>
        <v-list-item v-for="nav of navigations" :key="nav.text" :to="nav.to" class="text-subtitle-1 font-weight-bold">
          <v-list-item-title>
            {{ nav.text }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data () {
    return {
      drawer: false,
      date: '2020-12-11',
      navigations: [
        { text: this.$t('title.categories.index'), to: '/categories' },
        { text: this.$t('title.foods.index'), to: '/foods' }
      ]
    }
  },
  methods: {
    change (event) {
      console.log(event)
    }
  }
}
</script>
