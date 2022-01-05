// { id: 1, title: '唐揚げ', calory: 300, protein: 100, fat: 80, carbonhydrate: 30, dateId: 1 }

export const state = () => ({
  dishes: [],
  currentId: 0
})

export const getters = {
  dishes (state) {
    return state.dishes
  },
  dishIndex (state) {
    return (dish) => {
      return state.dishes.findIndex(d => d.id === dish.id)
    }
  }
}

export const actions = {
  addDishe ({ commit }, payload) {
    commit('addDish', payload)
  },
  updateDish ({ commit, getters }, payload) {
    const index = getters.dishIndex(payload.dish)
    commit('updateDish', { dish: payload.dish, index })
  },
  removeDish ({ commit, getters }, payload) {
    const index = getters.dishIndex(payload.dish)
    commit('removeDish', { index })
  }
}

export const mutations = {
  addDishe (state, { dish }) {
    state.dishes.push({ ...dish, id: ++state.currentId })
  },
  updateDish (state, { dish, index }) {
    state.dishes.splice(index, 1, dish)
  },
  removeDish (state, { index }) {
    state.dishes.splice(index, 1)
  }
}
