import { getters, actions, mutations } from '@/store/ateFood'

const ateFoods = [
  { id: 1, amount: 100, foodId: 1, dateId: 1 },
  { id: 2, amount: 200, foodId: 2, dateId: 1 },
  { id: 3, amount: 300, foodId: 1, dateId: 2 }
]
const addingAteFood = { amount: 400, foodId: 3, dateId: 1 }
const updatingAteFood = { ...ateFoods[0], amount: 1 }
const removingAteFood = ateFoods[0]
const uprmIndex = 0

describe('getters', () => {
  it('ateFoodsByDate', () => {
    const date = { id: 1 }
    const result = getters.ateFoodsByDate({ ateFoods })(date)
    expect(result).toEqual([ateFoods[0], ateFoods[1]])
  })

  it('ateFoodIndex', () => {
    const ateFood = { id: 1 }
    const result = getters.ateFoodIndex({ ateFoods })(ateFood)
    expect(result).toEqual(0)
  })
})

describe('actions', () => {
  let commit
  const gettersStub = {
    ateFoodIndex (ateFood) {
      return uprmIndex
    }
  }

  beforeEach(() => {
    commit = jest.fn()
  })

  it('addAteFood', () => {
    const payload = { ateFood: addingAteFood }
    actions.addAteFood({ commit }, payload)
    expect(commit).toHaveBeenCalledWith('addAteFood', payload)
  })

  it('updateAteFood', () => {
    const payload = { ateFood: updatingAteFood }
    actions.updateAteFood({ commit, getters: gettersStub }, payload)
    expect(commit).toHaveBeenCalledWith('updateAteFood', { ateFood: updatingAteFood, index: uprmIndex })
  })

  it('removeAteFood', () => {
    const payload = { ateFood: removingAteFood }
    actions.removeAteFood({ commit, getters: gettersStub }, payload)
    expect(commit).toHaveBeenCalledWith('removeAteFood', { index: uprmIndex })
  })
})

describe('mutations', () => {
  const state = () => ({
    ateFoods,
    currentId: 3
  })
  let _state

  beforeEach(() => {
    _state = state()
  })

  it('addAteFood', () => {
    mutations.addAteFood(_state, { ateFood: addingAteFood })
    expect(_state.ateFoods[_state.ateFoods.length - 1]).toEqual({ ...addingAteFood, id: 4 })
    expect(_state.currentId).toEqual(4)
  })

  it('updateAteFood', () => {
    mutations.updateAteFood(_state, { ateFood: updatingAteFood, index: uprmIndex })
    expect(_state.ateFoods[0].amount).toEqual(1)
  })

  it('removeAteFood', () => {
    mutations.removeAteFood(_state, { index: uprmIndex })
    expect(_state.ateFoods.includes(removingAteFood)).toEqual(false)
  })
})
