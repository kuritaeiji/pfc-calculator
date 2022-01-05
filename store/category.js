export const state = () => ({
  categories: [
    { id: 1, title: '主食' },
    { id: 2, title: '肉類' }
  ],
  currentId: 2,
  currentTab: 1
})

export const getters = {
  categories (state) {
    return state.categories
  },
  categoryIndexById (state) {
    return id => state.categories.findIndex(c => c.id === id)
  },
  currentTab (state) {
    return state.currentTab
  },
  currentCreateTab (state) {
    return state.currentCreateTab
  }
}

const observers = ['food']

export const actions = {
  addCategory ({ commit }, payload) {
    commit('addCategory', payload)
  },
  removeCategory ({ commit, getters, dispatch }, payload) {
    const index = getters.categoryIndexById(payload.category.id)
    dispatch('notifyObservers', payload)
    commit('removeCategory', { index })
  },
  updateCategory ({ commit, getters }, payload) {
    const index = getters.categoryIndexById(payload.category.id)
    commit('updateCategory', { ...payload, index })
  },
  setCategories ({ commit }, payload) {
    commit('setCategories', payload)
  },
  setCurrentTab ({ commit }, payload) {
    commit('setCurrentTab', payload)
  },
  notifyObservers ({ dispatch }, payload) {
    observers.forEach(observer => dispatch(`${observer}/removedCategory`, payload, { root: true }))
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
  },
  setCurrentTab (state, { category }) {
    state.currentTab = category.id
  }
}
