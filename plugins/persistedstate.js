import createPersistedState from 'vuex-persistedstate'

export default ({ store, isDev }) => {
  const storage = isDev ? sessionStorage : localStorage
  createPersistedState({
    key: 'pfc-calculator',
    storage
  })(store)
}
