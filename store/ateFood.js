// { id: 1, amount: 100, foodId: 1, dateId: 1 }

export const state = () => ({
  ateFoods: [],
  currentId: 0
})

export const getters = {
  ateFoods (state) {
    return state.ateFoods
  },
  ateFoodIndex (state) {
    return (ateFood) => {
      return state.ateFoods.findIndex(f => f.id === ateFood.id)
    }
  },
  foodByAteFood (state, getters, rootState, rootGetters) {
    return (ateFood) => {
      return rootGetters['food/foodById'](ateFood.foodId)
    }
  },
  pfc (state, getters) {
    return (ateFood) => {
      const food = getters.foodByAteFood(ateFood)
      const ratio = ateFood.amount / food.per
      return {
        protein: getters.calculate(food.protein, ratio),
        fat: getters.calculate(food.fat, ratio),
        carbonhydrate: getters.calculate(food.carbonhydrate, ratio),
        calory: getters.calculate(food.calory, ratio)
      }
    }
  },
  calculate () {
    return (pfc, ratio) => {
      return Math.round(pfc * ratio * 100) / 100
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
  },
  setCategoryTab ({ dispatch, getters, rootGetters }, payload) {
    const food = getters.foodByAteFood(payload.ateFood)
    const category = rootGetters['food/categoryByFood'](food)
    dispatch('category/setCurrentTab', { category }, { root: true })
  },
  removedFood ({ commit }, payload) {
    commit('removedFood', payload)
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
  },
  removedFood (state, { food }) {
    state.ateFoods = state.ateFoods.filter(ateFood => ateFood.foodId !== food.id)
  }
}
