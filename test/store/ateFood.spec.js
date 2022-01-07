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

  it('setCategoryTab', () => {
    const category = { id: 1, title: 'カテゴリー' }
    const gettersStub = {
      foodByAteFood (ateFood) {
        return 'food'
      }
    }
    const rootGettersStub = {
      'food/categoryByFood' (food) {
        return category
      }
    }
    const dispatch = jest.fn()
    actions.setCategoryTab({ dispatch, getters: gettersStub, rootGetters: rootGettersStub }, { ateFood: 'ateFood' })
    expect(dispatch).toHaveBeenCalledWith('category/setCurrentTab', { category }, { root: true })
  })

  it('removedFood', () => {
    const payload = { food: { id: 1 } }
    actions.removedFood({ commit }, payload)
    expect(commit).toHaveBeenCalledWith('removedFood', payload)
  })
})

describe('mutations', () => {
  const state = () => ({
    ateFoods: [...ateFoods],
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

  it('removedFood', () => {
    const payload = { food: { id: 1 } }
    mutations.removedFood(_state, payload)
    expect(_state.ateFoods).toEqual([ateFoods[1]])
  })
})
