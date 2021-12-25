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
  }
}

export const actions = {
  addBody ({ commit, getters }, payload) {
    if (!getters.bodyByDate(payload.date)) {
      commit('addBody', payload)
    }
  }
}

export const mutations = {
  addBody (state, { date }) {
    state.bodies.push({ ...defaultBody, id: ++state.currentId, dateId: date.id })
  }
}
