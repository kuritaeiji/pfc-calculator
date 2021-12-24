import useDraggable from '@/mixins/useDraggable'

describe('mixins/useDraggable', () => {
  describe('computed', () => {
    describe('dragClass', () => {
      it('isDraggingがfalseの時', () => {
        expect(useDraggable.computed.dragClass.call({ isDragging: false })).toEqual({
          cgrab: true,
          cgrabbing: false
        })
      })

      it('isDraggingがtrueの時', () => {
        expect(useDraggable.computed.dragClass.call({ isDragging: true })).toEqual({
          cgrab: false,
          cgrabbing: true
        })
      })
    })
  })

  describe('methods', () => {
    it('onStart', () => {
      const vueInstance = { isDragging: false }
      useDraggable.methods.onStart.call(vueInstance)
      expect(vueInstance.isDragging).toEqual(true)
    })

    it('onEnd', () => {
      const vueInstance = { isDragging: true }
      useDraggable.methods.onEnd.call(vueInstance)
      expect(vueInstance.isDragging).toEqual(false)
    })
  })
})
