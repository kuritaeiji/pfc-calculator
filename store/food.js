export const state = () => ({
  foods: [
    { id: 1, title: '米', per: 1, unit: '合', calory: 534, protein: 9.15, fat: 1.35, carbonhydrate: 116.65, categoryId: 1 },
    { id: 2, title: 'パスタ', per: 1, unit: '人前', calory: 340, protein: 11.7, fat: 1.98, carbonhydrate: 64.98, categoryId: 1 },
    { id: 3, title: '鶏胸肉', per: 100, unit: 'g', calory: 191, protein: 19.5, fat: 11.6, carbonhydrate: 0, categoryId: 2 }
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
  },
  addFood ({ commit }, payload) {
    commit('addFood', payload)
  },
  removedCategory ({ commit }, payload) {
    commit('removedCategory', payload)
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
  },
  addFood (state, { food }) {
    state.foods.push(food)
  },
  removedCategory (state, { category }) {
    state.foods = state.foods.filter(food => food.categoryId !== category.id)
  }
}
