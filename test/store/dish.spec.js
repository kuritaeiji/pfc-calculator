import { getters, actions, mutations } from '@/store/dish'

const dishes = [
  { id: 1, title: '唐揚げ', calory: 300, protein: 100, fat: 80, carbonhydrate: 30, dateId: 1 },
  { id: 2, title: 'カレー', calory: 200, protein: 140, fat: 90, carbonhydrate: 400, dateId: 1 },
  { id: 3, title: 'うどん', calory: 500, protein: 20, fat: 60, carbonhydrate: 500, dateId: 2 }
]

describe('getters', () => {
  it('dishes', () => {
    const result = getters.dishes({ dishes })
    expect(result).toEqual(dishes)
  })

  it('dishIndex', () => {
    const result = getters.dishIndex({ dishes })(dishes[0])
    expect(result).toEqual(0)
  })
})

describe('actions', () => {
  const index = 0
  const gettersStub = {
    dishIndex (dish) {
      return index
    }
  }
  let commit
  beforeEach(() => {
    commit = jest.fn()
  })

  it('addDish', () => {
    actions.addDishe({ commit }, { dish: dishes[0] })
    expect(commit).toHaveBeenCalledWith('addDish', { dish: dishes[0] })
  })

  it('updateDish', () => {
    actions.updateDish({ commit, getters: gettersStub }, { dish: dishes[0] })
    expect(commit).toHaveBeenCalledWith('updateDish', { dish: dishes[0], index })
  })

  it('removeDish', () => {
    actions.removeDish({ commit, getters: gettersStub }, { dish: dishes[0] })
    expect(commit).toHaveBeenCalledWith('removeDish', { index })
  })
})

describe('mutations', () => {
  function state () {
    return {
      dishes: [...dishes],
      currentId: 3
    }
  }
  let _state
  beforeEach(() => {
    _state = state()
  })

  it('addDish', () => {
    const dish = { title: 'ラーメン' }
    mutations.addDishe(_state, { dish })
    expect(_state.dishes[_state.dishes.length - 1]).toEqual({ ...dish, id: 4 })
    expect(_state.currentId).toEqual(4)
  })

  it('updateDish', () => {
    const index = 0
    const dish = { id: 1, title: 'test' }
    mutations.updateDish(_state, { dish, index })
    expect(_state.dishes[0]).toEqual(dish)
  })

  it('removeDish', () => {
    const index = 0
    mutations.removeDish(_state, { index })
    expect(_state.dishes).toEqual([dishes[1], dishes[2]])
  })
})
