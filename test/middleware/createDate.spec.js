import createDate from '@/middleware/createDate'

describe('createDate', () => {
  const params = { date: '2020-01-01' }
  const dateObject = { id: 1, year: 2020, month: 1, day: 1, string: '2020-01-01' }
  let store

  beforeEach(() => {
    store = {
      dispatch: jest.fn(),
      getters: {
        'date/findDate' (date) {
          return dateObject
        }
      }
    }
  })

  it('dateを作成する', () => {
    createDate({ store, params })
    expect(store.dispatch.mock.calls[0]).toEqual(['date/addDate', { date: { string: params.date } }])
  })

  it('bodyを作成する', () => {
    createDate({ store, params })
    expect(store.dispatch.mock.calls[1]).toEqual(['body/addBody', { date: dateObject }])
  })
})
