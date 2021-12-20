<template>
  <div>
    <v-app-bar app flat>
      <v-app-bar-nav-icon @click="drawer = !drawer" />

      <v-app-bar-title class="grey--text font-weight-bold text-h5 cp">
        <nuxt-link to="/" tag="div">
          PFC計算機
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
          locale="ja-jp"
          first-day-of-week="1"
          :day-format="(d) => new Date(d).getDate()"
          @change="change"
        />
      </v-menu>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app hide-overlay>
      ppp
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data () {
    return {
      drawer: false
    }
  },
  methods: {
    change (event) {
      console.log(event)
    }
  }
}
</script>
