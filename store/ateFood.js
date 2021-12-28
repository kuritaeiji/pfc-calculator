// { id: 1, amount: 100, foodId: 1, dateId: 1 }

export const state = () => ({
  ateFoods: [],
  currentId: 0
})

export const getters = {
  ateFoodsByDate (state) {
    return (date) => {
      return state.ateFoods.filter(f => f.dateId === date.id)
    }
  },
  ateFoodIndex (state) {
    return (ateFood) => {
      return state.ateFoods.findIndex(f => f.id === ateFood.id)
    }
  }
}

export const actions = {
  addAteFood ({ commit }, payload) {
    commit('addAteFood', payload)
  },
  updateAteFood ({ commit, getters }, payload) {
    const index = getters.ateFoodIndex(payload.ateFood)
    commit('updateAteFood', { ateFood: payload.ateFood, index })
  },
  removeAteFood ({ commit, getters }, payload) {
    const index = getters.ateFoodIndex(payload.ateFood)
    commit('removeAteFood', { index })
  }
}

export const mutations = {
  addAteFood (state, { ateFood }) {
    state.ateFoods.push({ id: ++state.currentId, ...ateFood })
  },
  updateAteFood (state, { ateFood, index }) {
    state.ateFoods.splice(index, 1, ateFood)
  },
  removeAteFood (state, { index }) {
    state.ateFoods.splice(index, 1)
  }
}
