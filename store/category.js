export const state = () => ({
  categories: [
    { id: 1, name: '主食' },
    { id: 2, name: '肉類' }
  ],
  currentId: 2
})

export const getters = {
  categories (state) {
    return state.categories
  },
  categoryIndexById (state) {
    return id => state.categories.findIndex(c => c.id === id)
  }
}

export const actions = {
  addCategory ({ commit }, payload) {
    commit('addCategory', payload)
  },
  removeCategory ({ commit, getters }, payload) {
    const index = getters.categoryIndexById(payload.category.id)
    commit('removeCategory', { index })
  },
  updateCategory ({ commit, getters }, payload) {
    const index = getters.categoryIndexById(payload.category.id)
    commit('updateCategory', { ...payload, index })
  },
  setCategories ({ commit }, payload) {
    commit('setCategories', payload)
  }
}

export const mutations = {
  addCategory (state, { category }) {
    state.categories.push({ ...category, id: ++state.currentId })
  },
  removeCategory (state, { index }) {
    state.categories.splice(index, 1)
  },
  updateCategory (state, { category, index }) {
    state.categories.splice(index, 1, category)
  },
  setCategories (state, { categories }) {
    state.categories = categories
  }
}
