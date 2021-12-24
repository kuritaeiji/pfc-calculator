import { getters, actions, mutations } from '@/store/category'

const categories = [
  { id: 1, name: '主食' },
  { id: 2, name: '肉類' }
]

const newCategories = [
  { id: 2, name: '肉類' },
  { id: 1, name: '主食' }
]

const currentTab = 10

describe('getters', () => {
  it('categories', () => {
    const result = getters.categories({ categories })
    expect(result).toEqual(categories)
  })

  it('categoryIndexById', () => {
    const result = getters.categoryIndexById({ categories })(1)
    expect(result).toEqual(0)
  })

  it('currentTab', () => {
    const result = getters.currentTab({ currentTab })
    expect(result).toEqual(currentTab)
  })
})

describe('actions', () => {
  const index = 0
  const _getters = { categoryIndexById: jest.fn(id => index) }
  const payload = { category: { id: 1 } }

  it('addCategory', () => {
    const commit = jest.fn()
    actions.addCategory({ commit }, payload)
    expect(commit).toHaveBeenCalledWith('addCategory', payload)
  })

  it('removeCategory', () => {
    const commit = jest.fn()
    const dispatch = jest.fn()
    actions.removeCategory({ commit, dispatch, getters: _getters }, payload)
    expect(dispatch).toHaveBeenCalledWith('notifyObservers', payload)
    expect(commit).toHaveBeenCalledWith('removeCategory', { index })
  })

  it('updateCategory', () => {
    const commit = jest.fn()
    actions.updateCategory({ commit, getters: _getters }, payload)
    expect(commit).toHaveBeenCalledWith('updateCategory', { ...payload, index })
  })

  it('setCategories', () => {
    const commit = jest.fn()
    actions.setCategories({ commit }, newCategories)
    expect(commit).toHaveBeenCalledWith('setCategories', newCategories)
  })

  it('setCurrentTab', () => {
    const commit = jest.fn()
    actions.setCurrentTab({ commit }, payload)
    expect(commit).toHaveBeenCalledWith('setCurrentTab', payload)
  })

  it('notifyObservers', () => {
    const dispatch = jest.fn()
    actions.notifyObservers({ dispatch }, payload)
    expect(dispatch).toHaveBeenCalledWith('food/removedCategory', payload, { root: true })
  })
})

describe('mutations', () => {
  const state = () => ({
    categories: [
      { id: 1, name: '主食' },
      { id: 2, name: '肉類' }
    ],
    currentId: 2,
    currentTab: 10
  })
  let _state

  beforeEach(() => {
    _state = state()
  })

  it('addCategory', () => {
    const newCategory = { name: 'test' }
    mutations.addCategory(_state, { category: newCategory })
    expect(_state.categories.pop()).toEqual({ ...newCategory, id: 3 })
    expect(_state.currentId).toEqual(3)
  })

  it('removeCategory', () => {
    mutations.removeCategory(_state, { index: 0 })
    expect(_state.categories).toEqual([{ id: 2, name: '肉類' }])
  })

  it('updateCategory', () => {
    const updatingCategory = { id: 1, name: '主' }
    mutations.updateCategory(_state, { category: updatingCategory, index: 0 })
    expect(_state.categories[0]).toEqual(updatingCategory)
  })

  it('setCategories', () => {
    mutations.setCategories(_state, { categories: newCategories })
    expect(_state.categories).toEqual(newCategories)
  })

  it('setCurrentTab', () => {
    mutations.setCurrentTab(_state, { category: { id: 1 } })
    expect(_state.currentTab).toEqual(1)
  })
})
