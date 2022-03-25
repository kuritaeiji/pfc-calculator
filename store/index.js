import createPersistedState from 'vuex-persistedstate'

export const plugins = [createPersistedState({
  key: 'pfc-calculator',
  storage: localStorage
})]
