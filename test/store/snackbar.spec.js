import { getters, actions, mutations } from '@/store/snackbar'

const defaultSnackar = {
  message: '',
  isShow: false
}

describe('getters', () => {
  const state = {
    snackbar: defaultSnackar
  }

  it('snackbar', () => {
    const result = getters.snackbar(state)
    expect(result).toEqual(defaultSnackar)
  })
})

describe('actions', () => {
  let commit
  beforeEach(() => {
    commit = jest.fn()
  })

  it('resetSnackbar', () => {
    actions.resetSnackbar({ commit })
    expect(commit).toHaveBeenCalledWith('resetSnackbar')
  })

  it('setSnackbar', () => {
    const payload = { snackbar: defaultSnackar }
    actions.setSnackbar({ commit }, payload)
    expect(commit).toHaveBeenCalledWith('setSnackbar', payload)
  })
})

describe('mutations', () => {
  const state = () => ({
    snackbar: defaultSnackar
  })

  const showingSnackbar = {
    message: 'message',
    isShow: true
  }

  let _state
  beforeEach(() => {
    _state = state()
  })

  it('resetSnackbar', () => {
    _state.snackbar = showingSnackbar
    mutations.resetSnackbar(_state)
    expect(_state.snackbar).toEqual(defaultSnackar)
  })

  it('setSnackbar', () => {
    mutations.setSnackbar(_state, { snackbar: showingSnackbar })
    expect(_state.snackbar).toEqual(showingSnackbar)
  })
})
