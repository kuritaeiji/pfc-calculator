import Vuetify from 'vuetify'
import { mount, createLocalVue } from '@vue/test-utils'
import DeleteDialog from '@/components/DeleteDialog.vue'

describe('components/DeleteDialog.vue', () => {
  let wrapper
  let vuetify
  let localVue
  let _DeleteDialog
  let mock

  describe('template', () => {
    beforeEach(() => {
      localVue = createLocalVue()
      vuetify = new Vuetify()

      const App = localVue.component('App', {
        components: { DeleteDialog },
        template: `
          <v-app>
            <delete-dialog />
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

      _DeleteDialog = wrapper.findComponent(DeleteDialog)
      mock = jest.fn()
    })

    it('いいえボタンをクリックするとcloseDialogを呼び出す', async () => {
      _DeleteDialog.vm.closeDialog = mock
      wrapper.find('.v-btn').trigger('click')
      await wrapper.vm.$nextTick()
      wrapper.find('.v-btn.red').trigger('click')
      expect(mock).toHaveBeenCalled()
    })

    it('はいボタンをクリックするとdeleteTargetを呼び出す', async () => {
      _DeleteDialog.vm.deleteTarget = mock
      wrapper.find('.v-btn').trigger('click')
      await wrapper.vm.$nextTick()
      wrapper.find('.v-btn.primary').trigger('click')
      expect(mock).toHaveBeenCalled()
    })

    describe('script', () => {
      beforeEach(() => {
        localVue = createLocalVue()
        vuetify = new Vuetify()
        wrapper = mount(DeleteDialog, {
          localVue,
          vuetify
        })
      })

      it('dataが正しい構造である', () => {
        expect(wrapper.vm.$data).toHaveProperty('dialog')
      })

      describe('methods', () => {
        it('deleteTarget', () => {
          const mock = jest.fn()
          wrapper.vm.$emit = mock
          wrapper.vm.dialog = true
          wrapper.vm.deleteTarget()
          expect(mock).toHaveBeenCalledWith('delete')
          expect(wrapper.vm.dialog).toEqual(false)
        })

        it('closeDialog', () => {
          wrapper.vm.dialog = true
          wrapper.vm.closeDialog()
          expect(wrapper.vm.dialog).toEqual(false)
        })
      })
    })
  })
})
