import Vue from 'vue'
import Vuetify from 'vuetify'
import { config } from '@vue/test-utils'

Vue.config.productionTip = false
Vue.use(Vuetify)

config.mocks.$t = key => key
config.stubs['sub-header'] = true
config.stubs.draggable = true
