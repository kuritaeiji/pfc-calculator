import validDate from '@/middleware/validDate'

describe('validDate', () => {
  let redirect
  let store

  beforeEach(() => {
    redirect = jest.fn()
    store = {
      dispatch: jest.fn()
    }
  })

  describe('未来の日付であった場合', () => {
    const params = { date: '2100-01-01' }
    it('スナックバーにエラーメッセージを格納する', () => {
      validDate({ params, store, redirect })
      expect(store.dispatch).toHaveBeenCalledWith('snackbar/setSnackbar', {
        snackbar: {
          message: '未来の日付は選択できません',
          isShow: true
        }
      })
    })

    it('ルートページにリダイレクトする', () => {
      validDate({ params, store, redirect })
      expect(redirect).toHaveBeenCalledWith('/')
    })
  })

  describe('過去の日付であった場合', () => {
    const params = { date: '1999-01-01' }
    it('何もしない', () => {
      validDate({ params, store, redirect })
      expect(store.dispatch).not.toHaveBeenCalled()
      expect(redirect).not.toHaveBeenCalled()
    })
  })
})
