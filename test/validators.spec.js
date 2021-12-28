import { required, shorter, select } from '@/validators/validators'

describe('validators', () => {
  describe('required', () => {
    describe('引数が文字列である時', () => {
      it('引数が空文字である時、エラーメッセージを返す', () => {
        expect(required('')).toEqual('入力して下さい')
      })

      it('引数が文字列である時、trueを返す', () => {
        expect(required('test')).toEqual(true)
      })
    })

    describe('引数が数値である時', () => {
      it('引数が0であるとき、trueを返す', () => {
        expect(required(0)).toEqual(true)
      })

      it('引数が存在する時、trueを返す', () => {
        expect(required(1)).toEqual(true)
      })
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

  describe('select', () => {
    const selectItems = [
      { text: 'test1', value: 1 },
      { text: 'test2', value: 2 }
    ]
    const validation = select(selectItems)

    it('selectItemsのvalueである場合、trueを返す', () => {
      expect(validation(2)).toEqual(true)
    })

    it('selectItemsのvalueでない場合、エラーメッセージを返す', () => {
      expect(validation(3)).toEqual('不正な値です')
    })
  })
})
