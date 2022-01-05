// { id: 1, year: 2020, month: 1, day: 1, string: '2020-01-01' }

export const state = () => ({
  dates: [],
  currentId: 0
})

export const getters = {
  // dateString = '2020-01-01'
  findDate (state) {
    return (dateString) => {
      return state.dates.find(d => new Date(dateString).valueOf() === new Date(d.string).valueOf())
    }
  },
  body (state, getters, rootState, rootGetters) {
    return (date) => {
      return rootGetters['body/bodyByDate'](date)
    }
  },
  ateFoodsByDate (state, getters, rootState, rootGetters) {
    return (date) => {
      let ateFoods = rootGetters['ateFood/ateFoods']
      ateFoods = ateFoods.filter(f => f.dateId === date.id)
      return ateFoods.map(f => ({ ...rootGetters['ateFood/foodByAteFood'](f), ...rootGetters['ateFood/pfc'](f), ...f }))
    }
  },
  dishesByDate (state, getters, rootState, rootGetters) {
    return (date) => {
      const dishes = rootGetters['dish/dishes']
      return dishes.filter(dish => dish.dateId === date.id)
    }
  }
}

export const actions = {
  // payload = { date: { string: '2020-01-01' } }
  addDate ({ commit, getters }, payload) {
    if (!getters.findDate(payload.date.string)) {
      commit('addDate', payload)
    }
  }
}

export const mutations = {
  addDate (state, { date }) {
    const dateObject = new Date(date.string)
    state.dates.push({
      id: ++state.currentId,
      year: dateObject.getFullYear(),
      month: dateObject.getMonth() + 1,
      day: dateObject.getDate(),
      string: date.string
    })
  }
}
