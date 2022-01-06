// { id: 1, year: 2020, month: 1, day: 1, string: '2020-01-01' }

export const state = () => ({
  dates: [],
  currentId: 0
})

const initialPfc = { calory: 0, protein: 0, fat: 0, carbonhydrate: 0 }
const initialBody = { weight: 0, fatPercentage: 0 }

function average (sumObject, length) {
  if (length) {
    Object.keys(sumObject).forEach((key) => { sumObject[key] = Math.round(sumObject[key] / length * 100) / 100 })
    return sumObject
  }
  return sumObject
}

export const getters = {
  // dateString = '2020-01-01'
  findDate (state) {
    return (dateString) => {
      return state.dates.find(d => new Date(dateString).valueOf() === new Date(d.string).valueOf())
    }
  },
  findDatesByMonth (state) {
    return (monthString) => {
      const [year, month] = monthString.split('-').map(element => Number(element))
      return state.dates.filter(d => d.year === year && d.month === month)
    }
  },
  body (state, getters, rootState, rootGetters) {
    return (date) => {
      return rootGetters['body/bodyByDate'](date)
    }
  },
  monthAverageBody (state, getters) {
    return (monthString) => {
      const monthDates = getters.findDatesByMonth(monthString)
      const sumBody = monthDates.reduce((sum, date) => {
        const body = getters.body(date)
        Object.keys(body).forEach((key) => { sum[key] += body[key] })
        return sum
      }, { ...initialBody })

      return average(sumBody, monthDates.length)
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
  },
  monthAveragePfc (state, getters) {
    return (monthString) => {
      const monthDates = getters.findDatesByMonth(monthString)
      const sumPfc = monthDates.reduce((sum, date) => {
        const pfc = getters.pfcByDate(date)
        Object.keys(pfc).forEach((key) => { sum[key] += pfc[key] })
        return sum
      }, { ...initialPfc })

      return average(sumPfc, monthDates.length)
    }
  },
  pfcByDate (state, getters) {
    return (date) => {
      const pfc = { calory: 0, protein: 0, fat: 0, carbonhydrate: 0 }
      const dishPfc = getters.dishPfcByDate(date)
      const ateFoodPfc = getters.ateFoodPfcByDate(date)
      Object.keys(pfc).forEach((key) => { pfc[key] = Math.round((dishPfc[key] + ateFoodPfc[key]) * 100) / 100 })
      return pfc
    }
  },
  dishPfcByDate (state, getters) {
    return (date) => {
      const pfc = { calory: 0, protein: 0, fat: 0, carbonhydrate: 0 }
      const dishes = getters.dishesByDate(date)
      // dishesが空の場合はpfcは0のまま
      dishes.forEach((dish) => {
        pfc.calory += dish.calory
        pfc.protein += dish.protein
        pfc.fat += dish.fat
        pfc.carbonhydrate += dish.carbonhydrate
      })
      return pfc
    }
  },
  ateFoodPfcByDate (state, getters, rootState, rootGetters) {
    return (date) => {
      const pfc = { calory: 0, protein: 0, fat: 0, carbonhydrate: 0 }
      const ateFoods = getters.ateFoodsByDate(date)
      ateFoods.forEach((ateFood) => {
        const ateFoodPfc = rootGetters['ateFood/pfc'](ateFood)
        pfc.calory += ateFoodPfc.calory
        pfc.protein += ateFoodPfc.protein
        pfc.fat += ateFoodPfc.fat
        pfc.carbonhydrate += ateFoodPfc.carbonhydrate
      })
      return pfc
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
