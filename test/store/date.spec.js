import { getters, actions, mutations } from '@/store/date'

const sampleDate = { id: 1, year: 2020, month: 1, day: 1, string: '2020-01-01' }
const dates = [sampleDate]

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

  it('body', () => {
    const rootGetters = { 'body/bodyByDate': jest.fn() }
    const date = '2020-01-01'
    getters.body('state', 'getters', 'rootState', rootGetters)(date)
    expect(rootGetters['body/bodyByDate']).toHaveBeenCalledWith(date)
  })
})

describe('actions', () => {
  describe('addDate', () => {
    const payload = { date: '2020-01-01' }
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
    mutations.addDate(state, { date: sampleDate.string })
    expect(state.dates[0]).toEqual(sampleDate)
    expect(state.currentId).toEqual(1)
  })
})
