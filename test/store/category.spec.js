import { getters, actions, mutations } from '@/store/category'

const categories = [
  { id: 1, name: '主食' },
  { id: 2, name: '肉類' }
]

describe('getters', () => {
  it('categories', () => {
    const result = getters.categories({ categories })
    expect(result).toEqual(categories)
  })

  it('categoryIndexById', () => {
    const result = getters.categoryIndexById({ categories })(1)
    expect(result).toEqual(0)
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
    actions.removeCategory({ commit, getters: _getters }, payload)
    expect(commit).toHaveBeenCalledWith('removeCategory', { index })
  })

  it('updateCategory', () => {
    const commit = jest.fn()
    actions.updateCategory({ commit, getters: _getters }, payload)
    expect(commit).toHaveBeenCalledWith('updateCategory', { ...payload, index })
  })
})

describe('mutations', () => {
  const state = () => ({
    categories: [
      { id: 1, name: '主食' },
      { id: 2, name: '肉類' }
    ],
    currentId: 2
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
})
