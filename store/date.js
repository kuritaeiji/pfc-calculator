// { id: 1, dating: '2020-01-01' }

export const state = () => ({
  dates: [],
  currentId: 0
})

export const getters = {
  findDate (state) {
    return (date) => {
      return state.dates.find(d => d.dating === date)
    }
  },
  body (state, getters, rootState, rootGetters) {
    return (date) => {
      return rootGetters['body/bodyByDate'](date)
    }
  }
}

export const actions = {
  addDate ({ commit, getters }, payload) {
    if (!getters.findDate(payload.date.dating)) {
      commit('addDate', payload)
    }
  }
}

export const mutations = {
  addDate (state, { date }) {
    state.dates.push({ ...date, id: ++state.currentId })
  }
}
