import { getters, actions } from '@/store/body'

const body = { id: 1, weight: 50, fatPercentage: 20.34, dateId: 1 }
const bodies = [body]
const date = { id: 1, year: 2020, month: 1, day: 1, string: '2020-01-01' }

describe('getters', () => {
  it('bodyByDate', () => {
    const result = getters.bodyByDate({ bodies })(date)
    expect(result).toEqual(body)
  })

  it('bodyIndexByDate', () => {
    const result = getters.bodyIndexByDate({ bodies })(date)
    expect(result).toEqual(0)
  })
})

describe('actions', () => {
  let commit
  beforeEach(() => {
    commit = jest.fn()
  })

  describe('addBody', () => {
    const payload = { body: { weight: 40, fatPercentage: 20 }, date }
    it('ある日付のbodyが見つからない場合、bodyを作成する', () => {
      const gettersStub = {
        bodyByDate (date) {
          return undefined
        }
      }
      actions.addBody({ commit, getters: gettersStub }, payload)
      expect(commit).toHaveBeenCalledWith('addBody', payload)
    })

    it('ある日付が見つかる場合、bodyを作成しない', () => {
      const gettersStub = {
        bodyByDate (date) {
          return date
        }
      }
      actions.addBody({ commit, getters: gettersStub }, payload)
      expect(commit).not.toHaveBeenCalled()
    })
  })

  it('updateWeight', () => {
    const weight = 100
    const index = 0
    const payload = { weight, date }
    const gettersStub = {
      bodyIndexByDate (date) {
        return index
      }
    }
    actions.updateWeight({ commit, getters: gettersStub }, payload)
    expect(commit).toHaveBeenCalledWith('updateWeight', { weight, index })
  })

  it('updateFatPercentage', () => {
    const fatPercentage = 30
    const index = 0
    const payload = { fatPercentage, date }
    const gettersStub = {
      bodyIndexByDate (date) {
        return index
      }
    }
    actions.updateFatPercentage({ commit, getters: gettersStub }, payload)
    expect(commit).toHaveBeenCalledWith('updateFatPercentage', { fatPercentage, index })
  })
})
