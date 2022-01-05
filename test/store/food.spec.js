import { getters, actions, mutations } from '@/store/food'

const foods = [
  { id: 1, title: '米', per: 1, unit: '合', calory: 534, protein: 9.15, fat: 1.35, carbonhydrate: 116.65, categoryId: 1 },
  { id: 2, title: 'パスタ', per: 1, unit: '人前', calory: 340, protein: 11.7, fat: 1.98, carbonhydrate: 64.98, categoryId: 1 },
  { id: 3, title: '鶏胸肉', per: 100, unit: 'g', calory: 191, protein: 19.5, fat: 11.6, carbonhydrate: 0, categoryId: 2 }
]

describe('getters', () => {
  it('filteredFoods', () => {
    const rootGettersMock = { 'category/currentTab': 1 }
    const result = getters.filteredFoods({ foods }, 'getters', 'rootState', rootGettersMock)
    expect(result).toEqual([
      { id: 1, title: '米', per: 1, unit: '合', calory: 534, protein: 9.15, fat: 1.35, carbonhydrate: 116.65, categoryId: 1 },
      { id: 2, title: 'パスタ', per: 1, unit: '人前', calory: 340, protein: 11.7, fat: 1.98, carbonhydrate: 64.98, categoryId: 1 }
    ])
  })

  it('foodIndexById', () => {
    const result = getters.foodIndexById({ foods })(foods[0].id)
    expect(result).toEqual(0)
  })

  it('foodById', () => {
    const result = getters.foodById({ foods })(1)
    expect(result).toEqual(foods[0])
  })
})

describe('actions', () => {
  let commit
  let gettersMock

  beforeEach(() => {
    commit = jest.fn()
    gettersMock = {
      foodIndexById (id) {
        return 0
      }
    }
  })

  it('sortFoods', () => {
    const dragEvents = { oldIndex: 1, newIndex: 0 }
    actions.sortFoods({ commit }, dragEvents)
    expect(commit).toHaveBeenCalledWith('sortFoods', dragEvents)
  })

  it('updateFood', () => {
    const updatingFood = { ...foods[0], title: 'test' }
    actions.updateFood({ commit, getters: gettersMock }, { food: updatingFood })
    expect(commit).toHaveBeenCalledWith('updateFood', { food: updatingFood, index: 0 })
  })

  it('removeFood', () => {
    const removingFood = { ...foods[0] }
    actions.removeFood({ commit, getters: gettersMock }, { food: removingFood })
    expect(commit).toHaveBeenCalledWith('removeFood', { index: 0 })
  })

  it('addFood', () => {
    const newFood = { title: 'newFood' }
    actions.addFood({ commit }, { food: newFood })
    expect(commit).toHaveBeenCalledWith('addFood', { food: newFood })
  })

  it('removedCategory', () => {
    const category = { id: 1 }
    actions.removedCategory({ commit }, { category })
    expect(commit).toHaveBeenCalledWith('removedCategory', { category })
  })
})

describe('mutations', () => {
  const _state = () => ({
    foods: [
      { id: 1, title: '米', per: 1, unit: '合', calory: 534, protein: 9.15, fat: 1.35, carbonhydrate: 116.65, categoryId: 1 },
      { id: 2, title: 'パスタ', per: 1, unit: '人前', calory: 340, protein: 11.7, fat: 1.98, carbonhydrate: 64.98, categoryId: 1 },
      { id: 3, title: '鶏胸肉', per: 100, unit: 'g', calory: 191, protein: 19.5, fat: 11.6, carbonhydrate: 0, categoryId: 2 }
    ],
    currentId: 3
  })

  let state
  beforeEach(() => {
    state = _state()
  })

  it('sortFoods', () => {
    mutations.sortFoods(state, { oldIndex: 0, newIndex: 1 })
    expect(state.foods[0].id).toEqual(2)
    expect(state.foods[1].id).toEqual(1)
  })

  it('updateFood', () => {
    const updatingFood = { ...foods[0], title: 'test' }
    mutations.updateFood(state, { food: updatingFood, index: 0 })
    expect(state.foods[0].title).toEqual('test')
  })

  it('removeFood', () => {
    const removingFood = foods[0]
    mutations.removeFood(state, { food: removingFood })
    expect(state.foods.some(f => f.id === 1)).toEqual(false)
    expect(state.foods.length).toEqual(2)
  })

  it('addFood', () => {
    const food = { title: 'test' }
    mutations.addFood(state, { food })
    expect(state.foods[state.foods.length - 1].id).toEqual(4)
    expect(state.foods[state.foods.length - 1].title).toEqual('test')
    expect(state.currentId).toEqual(4)
  })

  it('removedCategory', () => {
    const category = { id: 1 }
    mutations.removedCategory(state, { category })
    expect(state.foods.length).toEqual(1)
    expect(state.foods[0].categoryId).toEqual(2)
  })
})
