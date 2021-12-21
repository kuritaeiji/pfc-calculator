import Vuetify from 'vuetify'
import { mount, createLocalVue } from '@vue/test-utils'
import CreateDialog from '@/components/CreateDialog.vue'

describe('components/CreateDialog.vue', () => {
  let wrapper
  let localVue
  let vuetify

  describe('template', () => {
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
    beforeEach(() => {
      localVue = createLocalVue()
      vuetify = new Vuetify()
      wrapper = mount(CreateDialog, {
        localVue,
        vuetify
      })
    })

    it('dataの構造が正しい', () => {
      expect(wrapper.vm.$data).toHaveProperty('dialog')
    })

    describe('methods', () => {
      let mock
      beforeEach(() => {
        mock = jest.fn()
        wrapper.vm.$emit = mock
      })

      it('closeDialog', () => {
        wrapper.vm.closeDialog()
        expect(mock).toHaveBeenCalledWith('closeDialog')
      })

      describe('add', () => {
        it('dialogをfalseにする', () => {
          wrapper.vm.dialog = true
          wrapper.vm.add()
          expect(wrapper.vm.dialog).toEqual(false)
        })

        it('addをemitする', () => {
          wrapper.vm.add()
          expect(mock).toHaveBeenCalledWith('add')
        })
      })
    })
  })
})
