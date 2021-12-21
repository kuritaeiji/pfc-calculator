import Vuetify from 'vuetify'
import { mount, createLocalVue } from '@vue/test-utils'
import EditDialog from '@/components/EditDialog.vue'

describe('components/EditDialog.vue', () => {
  let wrapper
  let localVue
  let vuetify

  describe('template', () => {
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
    beforeEach(() => {
      vuetify = new Vuetify()
      wrapper = mount(EditDialog, {
        localVue,
        vuetify
      })
    })

    it('dataは正しい構造を持つ', () => {
      expect(wrapper.vm.$data).toHaveProperty('dialog')
    })

    describe('methods', () => {
      it('openDialog', () => {
        const mock = jest.fn()
        wrapper.vm.$emit = mock
        wrapper.vm.openDialog()
        expect(mock).toHaveBeenCalledWith('openDialog')
        expect(wrapper.vm.dialog).toEqual(true)
      })

      it('update', () => {
        const mock = jest.fn()
        wrapper.vm.$emit = mock
        wrapper.vm.update()
        expect(mock).toHaveBeenCalledWith('update')
      })
    })
  })
})
