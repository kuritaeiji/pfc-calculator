// { id: 1, weight: 50, fatPercentage: 20.34, dateId: 1 }

const defaultBody = { weight: 0, fatPercentage: 0 }

export const state = () => ({
  bodies: [],
  currentId: 0
})

export const getters = {
  bodyByDate (state) {
    return (date) => {
      return state.bodies.find(body => body.dateId === date.id)
    }
  },
  bodyIndexByDate (state) {
    return (date) => {
      return state.bodies.findIndex(body => body.dateId === date.id)
    }
  }
}

export const actions = {
  addBody ({ commit, getters }, payload) {
    if (!getters.bodyByDate(payload.date)) {
      commit('addBody', payload)
    }
  },
  updateWeight ({ commit, getters }, payload) {
    const index = getters.bodyIndexByDate(payload.date)
    commit('updateWeight', { weight: payload.weight, index })
  },
  updateFatPercentage ({ commit, getters }, payload) {
    const index = getters.bodyIndexByDate(payload.date)
    commit('updateFatPercentage', { fatPercentage: payload.fatPercentage, index })
  }
}

export const mutations = {
  addBody (state, { date }) {
    state.bodies.push({ ...defaultBody, id: ++state.currentId, dateId: date.id })
  },
  updateWeight (state, { weight, index }) {
    state.bodies[index].weight = Math.round(weight * 100) / 100
  },
  updateFatPercentage (state, { fatPercentage, index }) {
    state.bodies[index].fatPercentage = Math.round(fatPercentage * 100) / 100
  }
}
