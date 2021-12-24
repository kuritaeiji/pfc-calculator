import Vuetify from 'vuetify'
import { mount, createLocalVue } from '@vue/test-utils'
import CreateDialog from '@/components/CreateDialog.vue'

describe('components/CreateDialog.vue', () => {
  let wrapper
  let localVue
  let vuetify

  let _CreateDialog

  beforeEach(() => {
    localVue = createLocalVue()
    vuetify = new Vuetify()
    const App = localVue.component('App', {
      components: { CreateDialog },
      template: `
        <v-app>
          <create-dialog />
        </v-app>
      `
    })
    const elem = document.createElement('div')
    if (document.body) {
      document.body.appendChild(elem)
    }
    wrapper = mount(App, {
      localVue,
      vuetify,
      attachTo: elem
    })
    _CreateDialog = wrapper.findComponent(CreateDialog)
  })

  describe('template', () => {
    // it('ダイアログの外側をクリックするとcloseDialogが呼び出される', () => {
    //   const mock = jest.fn()
    //   _CreateDialog.vm.closeDialog = mock
    //   wrapper.vm.$on('click:outside', mock)
    //   expect(mock).toHaveBeenCalled()
    // })

    it('ボタンをクリックするとaddが呼び出される', async () => {
      const mock = jest.fn()
      _CreateDialog.vm.add = mock
      wrapper.find('.v-btn').trigger('click')
      await wrapper.vm.$nextTick()
      wrapper.find('.v-btn--block').trigger('click')
      expect(mock).toHaveBeenCalled()
    })
  })

  describe('script', () => {
    it('dataの構造が正しい', () => {
      expect(_CreateDialog.vm.$data).toHaveProperty('dialog')
    })

    describe('methods', () => {
      let mock
      beforeEach(() => {
        mock = jest.fn()
        _CreateDialog.vm.$emit = mock
      })

      it('closeDialog', () => {
        _CreateDialog.vm.closeDialog()
        expect(mock).toHaveBeenCalledWith('closeDialog')
      })

      describe('add', () => {
        beforeEach(async () => {
          _CreateDialog.find('.v-btn').trigger('click')
          await _CreateDialog.vm.$nextTick()
        })

        describe('validationがtrueの時', () => {
          beforeEach(() => {
            const stub = jest.fn(() => true)
            _CreateDialog.findComponent({ ref: 'form' }).vm.validate = stub
          })

          it('dialogをfalseにする', () => {
            _CreateDialog.vm.dialog = true
            _CreateDialog.vm.add()
            expect(_CreateDialog.vm.dialog).toEqual(false)
          })

          it('addをemitする', () => {
            _CreateDialog.vm.add()
            expect(mock).toHaveBeenCalledWith('add')
          })
        })

        describe('validationがfalseの時', () => {
          it('何もしない', () => {
            const stub = jest.fn(() => false)
            _CreateDialog.findComponent({ ref: 'form' }).vm.validate = stub
            _CreateDialog.vm.dialog = true
            const mock = jest.fn()
            _CreateDialog.vm.$emit = mock
            _CreateDialog.vm.add()
            expect(_CreateDialog.vm.dialog).toEqual(true)
            expect(mock).not.toHaveBeenCalled()
          })
        })
      })
    })
  })
})
