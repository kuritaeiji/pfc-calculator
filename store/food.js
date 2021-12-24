export const state = () => ({
  foods: [
    { id: 1, name: '米', per: 1, unit: '合', calory: 534, p: 9.15, f: 1.35, c: 116.65, categoryId: 1 },
    { id: 2, name: 'パスタ', per: 1, unit: '人前', calory: 340, p: 11.7, f: 1.98, c: 64.98, categoryId: 1 },
    { id: 3, name: '鶏胸肉', per: 100, unit: 'g', calory: 191, p: 19.5, f: 11.6, c: 0, categoryId: 2 }
  ],
  currentId: 3
})

export const getters = {
  foods (state) {
    return state.foods
  },
  filteredFoods (state) {
    return (categoryId) => {
      return state.foods.filter(f => f.categoryId === categoryId)
    }
  },
  foodIndexById (state) {
    return (id) => {
      return state.foods.findIndex(f => f.id === id)
    }
  }
}

export const actions = {
  sortFoods ({ commit }, payload) {
    commit('sortFoods', payload)
  },
  updateFood ({ commit, getters }, payload) {
    const index = getters.foodIndexById(payload.food.id)
    commit('updateFood', { food: payload.food, index })
  },
  removeFood ({ commit, getters }, payload) {
    const index = getters.foodIndexById(payload.food.id)
    commit('removeFood', { index })
  }
}

export const mutations = {
  sortFoods (state, { oldIndex, newIndex }) {
    [state.foods[oldIndex], state.foods[newIndex]] = [state.foods[newIndex], state.foods[oldIndex]]
  },
  updateFood (state, { food, index }) {
    state.foods.splice(index, 1, food)
  },
  removeFood (state, { index }) {
    state.foods.splice(index, 1)
  }
}
