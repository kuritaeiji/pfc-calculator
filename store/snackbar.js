const defaultSnackar = {
  message: '',
  isShow: false
}

export const state = () => ({
  snackbar: defaultSnackar
})

export const getters = {
  snackbar (state) {
    return state.snackbar
  }
}

export const actions = {
  resetSnackbar ({ commit }) {
    commit('resetSnackbar')
  },
  setSnackbar ({ commit }, payload) {
    commit('setSnackbar', payload)
  }
}

export const mutations = {
  resetSnackbar (state) {
    state.snackbar = defaultSnackar
  },
  setSnackbar (state, { snackbar }) {
    state.snackbar = snackbar
  }
}
