import { required, shorter } from '@/validators/validators'

describe('validators', () => {
  describe('required', () => {
    it('引数が空文字である時、エラーメッセージを返す', () => {
      expect(required('')).toEqual('入力して下さい')
    })

    it('引数が文字列である時、trueを返す', () => {
      expect(required('test')).toEqual(true)
    })
  })

  describe('shorter', () => {
    const validation = shorter(10)

    it('10文字以下である時、trueを返す', () => {
      expect(validation('0123456789')).toEqual(true)
    })

    it('10文字より大きい時、エラーメッセージを返す', () => {
      expect(validation('01234567890')).toEqual('10文字以内で入力して下さい')
    })
  })
})
