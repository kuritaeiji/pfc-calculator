import Vuetify from 'vuetify'
import { mount, createLocalVue } from '@vue/test-utils'
import EditDialog from '@/components/EditDialog.vue'

describe('components/EditDialog.vue', () => {
  let wrapper
  let localVue
  let vuetify
  let _EditDialog

  beforeEach(() => {
    vuetify = new Vuetify()
    localVue = createLocalVue()
    const App = localVue.component('App', {
      components: { EditDialog },
      template: `
        <v-app>
          <edit-dialog />
        </v-app>
      `
    })
    const element = document.createElement('div')
    if (document.body) {
      document.body.appendChild(element)
    }
    wrapper = mount(App, {
      localVue,
      vuetify,
      attachTo: element
    })
    _EditDialog = wrapper.findComponent(EditDialog)
  })

  describe('template', () => {
    // it('編集アイコンをクリックするとopenDialogが呼び出される', async () => {
    //   const mock = jest.fn()
    //   _EditDialog.vm.openDialog = mock
    //   wrapper.find('.v-btn--icon').trigger('click')
    //   expect(mock).toHaveBeenCalled()
    // })

    it('更新ボタンをクリックするとupdateが呼び出される', async () => {
      const mock = jest.fn()
      _EditDialog.vm.update = mock
      wrapper.find('.v-btn--icon').trigger('click')
      await wrapper.vm.$nextTick()
      wrapper.find('.v-btn--block').trigger('click')
      expect(mock).toHaveBeenCalled()
    })
  })

  describe('script', () => {
    it('dataは正しい構造を持つ', () => {
      expect(_EditDialog.vm.$data).toHaveProperty('dialog')
    })

    describe('methods', () => {
      it('openDialog', () => {
        const mock = jest.fn()
        _EditDialog.vm.$emit = mock
        _EditDialog.vm.openDialog()
        expect(mock).toHaveBeenCalledWith('openDialog')
        expect(_EditDialog.vm.dialog).toEqual(true)
      })

      describe('update', () => {
        beforeEach(async () => {
          _EditDialog.find('.v-btn').trigger('click')
          await _EditDialog.vm.$nextTick()
        })

        describe('validationがtrueの時', () => {
          it('emitする', () => {
            const stub = jest.fn(() => true)
            _EditDialog.findComponent({ ref: 'form' }).vm.validate = stub
            const mock = jest.fn()
            _EditDialog.vm.$emit = mock
            _EditDialog.vm.update()
            expect(mock).toHaveBeenCalledWith('update')
          })

          it('何もしない', () => {
            const stub = jest.fn(() => false)
            _EditDialog.findComponent({ ref: 'form' }).vm.validate = stub
            const mock = jest.fn()
            _EditDialog.vm.$emit = mock
            _EditDialog.vm.update()
            expect(mock).not.toHaveBeenCalled()
          })
        })
      })
    })
  })
})
