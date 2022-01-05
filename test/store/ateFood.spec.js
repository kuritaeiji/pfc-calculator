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
    const foods = [{ id: 1, title: '米' }, { id: 2, title: 'パスタ' }]
    const pfcs = [{ protein: 100, fat: 100, carbonhydrate: 100, calory: 100 }, { protein: 100, fat: 100, carbonhydrate: 1000, calory: 1000 }]
    const gettersStub = {
      foodByAteFood (ateFood) {
        if (ateFood.id === 1) { return foods[0] }
        return foods[1]
      },
      pfc (ateFood) {
        if (ateFood.id === 1) { return pfcs[0] }
        return pfcs[1]
      }
    }
    const result = getters.ateFoodsByDate({ ateFoods }, gettersStub)(date)
    expect(result).toEqual([{ ...foods[0], ...pfcs[0], ...ateFoods[0] }, { ...foods[1], ...pfcs[1], ...ateFoods[1] }])
  })

  it('ateFoodIndex', () => {
    const ateFood = { id: 1 }
    const result = getters.ateFoodIndex({ ateFoods })(ateFood)
    expect(result).toEqual(0)
  })

  it('foodByAteFood', () => {
    const ateFood = { id: 1 }
    const food = { id: 1, title: '米' }
    const rootGettersStub = {
      'food/foodById' (id) {
        return food
      }
    }
    const result = getters.foodByAteFood('state', 'getters', 'rootState', rootGettersStub)(ateFood)
    expect(result).toEqual(food)
  })

  it('pfc', () => {
    const ateFood = { amount: 150 }
    const gettersStub = {
      foodByAteFood (ateFood) {
        return {
          calory: 100,
          protein: 100,
          fat: 100,
          carbonhydrate: 100,
          per: 100
        }
      },
      calculate (pfc, ratio) {
        return Math.round(pfc * ratio * 100) / 100
      }
    }
    const result = getters.pfc('state', gettersStub)(ateFood)
    expect(result).toEqual({
      protein: 150,
      fat: 150,
      carbonhydrate: 150,
      calory: 150
    })
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
