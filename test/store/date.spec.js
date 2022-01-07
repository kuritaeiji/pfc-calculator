import { getters, actions, mutations } from '@/store/date'

const sampleDate = { id: 1, year: 2020, month: 1, day: 1, string: '2020-01-01' }
const dates = [sampleDate]
const pfcs = [
  { calory: 10.001, protein: 10.001, fat: 10.001, carbonhydrate: 10.001 },
  { calory: 10.001, protein: 10.001, fat: 10.001, carbonhydrate: 10.004 }
]
const sumRoundedPfcs = { calory: 20, protein: 20, fat: 20, carbonhydrate: 20.01 }
const sumPfcs = { calory: 20.002, protein: 20.002, fat: 20.002, carbonhydrate: 20.005 }

describe('getters', () => {
  describe('findDate', () => {
    it('日付が見つかるとき日付を返す', () => {
      const result = getters.findDate({ dates })('2020-01-01')
      expect(result).toEqual(sampleDate)
    })

    it('日付が見つからない時、undefinedを返す', () => {
      const result = getters.findDate({ dates })('2020-09-09')
      expect(result).toEqual(undefined)
    })
  })

  it('findDatesByMonth', () => {
    const monthString = '2020-01'
    const state = {
      dates: [
        { id: 1, year: 2020, month: 1 },
        { id: 2, year: 2020, month: 1 },
        { id: 3, year: 2020, month: 2 },
        { id: 4, year: 2021, month: 1 }
      ]
    }
    const result = getters.findDatesByMonth(state)(monthString)
    expect(result).toEqual([{ id: 1, year: 2020, month: 1 }, { id: 2, year: 2020, month: 1 }])
  })

  it('body', () => {
    const rootGetters = { 'body/bodyByDate': jest.fn() }
    const date = '2020-01-01'
    getters.body('state', 'getters', 'rootState', rootGetters)(date)
    expect(rootGetters['body/bodyByDate']).toHaveBeenCalledWith(date)
  })

  describe('monthAverageBody', () => {
    it('ある月のdateオブジェクトが一つも無い時', () => {
      const initialiBody = { weight: 0, fatPercentage: 0 }
      const gettersStub = {
        findDatesByMonth (monthString) {
          return []
        },
        body (date) {
          return initialiBody
        }
      }
      const result = getters.monthAverageBody('state', gettersStub)('2020-01')
      expect(result).toEqual(initialiBody)
    })

    it('ある月のdateオブジェクトが一つ以上存在する時', () => {
      const gettersStub = {
        findDatesByMonth (monthString) {
          return [{ id: 1 }, { id: 2 }]
        },
        body (date) {
          if (date.id === 1) { return { weight: 50, fatPercentage: 20.3 } }
          return { weight: 48, fatPercentage: 20.5 }
        }
      }
      const result = getters.monthAverageBody('state', gettersStub)('2020-01')
      expect(result).toEqual({ weight: 49, fatPercentage: 20.4 })
    })
  })

  it('ateFoodsByDate', () => {
    const ateFoods = [{ id: 1, amount: 100, foodId: 1, dateId: 1 }, { id: 2, amount: 200, foodId: 2, dateId: 1 }, { id: 3, dateId: 2 }]
    const foods = [{ id: 1, title: '米' }, { id: 2, title: 'パスタ' }]
    const pfcs = [{ protein: 100, fat: 100, carbonhydrate: 100, calory: 100 }, { protein: 100, fat: 100, carbonhydrate: 1000, calory: 1000 }]
    const rootGettersStub = {
      'ateFood/ateFoods': ateFoods,
      'ateFood/foodByAteFood' (ateFood) {
        if (ateFood.id === 1) { return foods[0] }
        return foods[1]
      },
      'ateFood/pfc' (ateFood) {
        if (ateFood.id === 1) { return pfcs[0] }
        return pfcs[1]
      }
    }
    const result = getters.ateFoodsByDate('state', 'getters', 'rootState', rootGettersStub)(sampleDate)
    expect(result).toEqual([{ ...foods[0], ...pfcs[0], ...ateFoods[0] }, { ...foods[1], ...pfcs[1], ...ateFoods[1] }])
  })

  it('dishesByDate', () => {
    const dishes = [{ id: 1, title: '1', dateId: 1 }, { id: 2, title: '2', dateId: 2 }]
    const rootGettersStub = {
      'dish/dishes': dishes
    }
    const result = getters.dishesByDate('state', 'getters', 'rootState', rootGettersStub)(sampleDate)
    expect(result).toEqual([dishes[0]])
  })

  it('dishPfcByDate', () => {
    const gettersStub = {
      dishesByDate (date) {
        return pfcs
      }
    }
    const result = getters.dishPfcByDate('state', gettersStub)(sampleDate)
    expect(result).toEqual(sumPfcs)
  })

  it('ateFoodPfcByDate', () => {
    const gettersStub = {
      ateFoodsByDate (date) {
        return [{ id: 1 }, { id: 2 }]
      }
    }
    const rootGettersStub = {
      'ateFood/pfc' (ateFood) {
        if (ateFood.id === 1) {
          return pfcs[0]
        }
        return pfcs[1]
      }
    }
    const result = getters.ateFoodPfcByDate('state', gettersStub, 'rootState', rootGettersStub)(sampleDate)
    expect(result).toEqual(sumPfcs)
  })

  it('pfcByDate', () => {
    const gettersStub = {
      dishPfcByDate (date) {
        return pfcs[0]
      },
      ateFoodPfcByDate (date) {
        return pfcs[1]
      }
    }
    const result = getters.pfcByDate('state', gettersStub)(sampleDate)
    expect(result).toEqual(sumRoundedPfcs)
  })

  describe('monthAveragePfc', () => {
    it('ある月のdateオブジェクトが一つも無い時', () => {
      const initialPfc = { calory: 0, protein: 0, fat: 0, carbonhydrate: 0 }
      const gettersStub = {
        findDatesByMonth (monthString) {
          return []
        },
        pfcByDate (date) {
          return initialPfc
        }
      }
      const result = getters.monthAveragePfc('state', gettersStub)('2020-01')
      expect(result).toEqual(initialPfc)
    })

    it('ある月のdateオブジェクトが一つ以上存在する時', () => {
      const answer = { calory: 1900, protein: 250, fat: 300, carbonhydrate: 400 }
      const gettersStub = {
        findDatesByMonth (monthString) {
          return [{ id: 1 }, { id: 2 }]
        },
        pfcByDate (date) {
          if (date.id === 1) { return { calory: 1800, protein: 300.001, fat: 400.001, carbonhydrate: 500.001 } }
          return { calory: 2000, protein: 200.001, fat: 200.001, carbonhydrate: 300.001 }
        }
      }
      const result = getters.monthAveragePfc('state', gettersStub)('2020-01')
      expect(result).toEqual(answer)
    })
  })
})

describe('actions', () => {
  describe('addDate', () => {
    const payload = { date: { string: '2020-01-01' } }
    let commit
    beforeEach(() => {
      commit = jest.fn()
    })

    it('まだ日付が作成されていない場合、日付を作成する', () => {
      const gettersStub = {
        findDate (date) {
          return undefined
        }
      }

      actions.addDate({ commit, getters: gettersStub }, payload)
      expect(commit).toHaveBeenCalledWith('addDate', payload)
    })

    it('日付が既に作成されている場合、日付を作成しない', () => {
      const gettersStub = {
        findDate (date) {
          return sampleDate
        }
      }

      actions.addDate({ commit, getters: gettersStub }, payload)
      expect(commit).not.toHaveBeenCalled()
    })
  })
})

describe('mutations', () => {
  const state = {
    dates: [],
    currentId: 0
  }

  it('addDate', () => {
    mutations.addDate(state, { date: { string: sampleDate.string } })
    expect(state.dates[0]).toEqual(sampleDate)
    expect(state.currentId).toEqual(1)
  })
})
