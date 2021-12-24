import Vuex from 'vuex'
import Vuetify from 'vuetify'
import VueMeta from 'vue-meta'
import { mount, createLocalVue } from '@vue/test-utils'
import * as categoryStore from '@/store/category'
import index from '@/pages/categories/index.vue'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueMeta, { keyName: 'head' })

describe('pages/categories/index.vue', () => {
  let wrapper
  let vuetify
  let store
  let _categoryStore
  let mock
  let mock2
  const categories = [
    { id: 1, name: '主食' },
    { id: 2, name: '肉類' }
  ]

  beforeEach(() => {
    _categoryStore = {
      ...categoryStore,
      namespaced: true,
      state () {
        return {
          categories,
          currentId: 2
        }
      }
    }

    store = new Vuex.Store({
      modules: {
        category: _categoryStore
      }
    })
    vuetify = new Vuetify()

    wrapper = mount(index, {
      localVue,
      store,
      vuetify,
      stubs: {
        EditDialog: true,
        DeleteDialog: true,
        CreateDialog: true
      }
    })

    mock = jest.fn()
    mock2 = jest.fn()
  })

  describe('template', () => {
    // it('ドラッグを開始するとisDraggingをtrueにする', () => {
    //   wrapper.vm.isDraggable = false
    //   wrapper.find('draggable-stub').vm.$emit('start')
    //   expect(wrapper.vm.isDraggable).toEqual(true)
    // })

    // it('ドラッグを終えるとisDraggingをfalseにする', () => {
    //   wrapper.vm.isDraggable = true
    //   wrapper.find('draggable-stub').vm.$emit('end')
    //   expect(wrapper.vm.isDraggable).toEqual(false)
    // })

    it('openDialogが発火するとopenEditDialogが呼ばれる', () => {
      wrapper.vm.openEditDialog = mock
      wrapper.find('editdialog-stub').vm.$emit('openDialog')
      expect(mock).toHaveBeenCalledWith(categories[0])
    })

    // it('updateが発火するとupdateCategoryTemplateが呼ばれる', () => {
    //   wrapper.vm.updateCategoryTemplate = mock
    //   wrapper.find('editdialog-stub').vm.$emit('update')
    //   expect(mock).toHaveBeenCalled()
    // })

    // it('deleteが発火するとremoveCategoryTemplateが呼ばれる', () => {
    //   wrapper.vm.removeCategoryTemplate = mock
    //   wrapper.find('deletedialog-stub').vm.$emit('delete')
    //   expect(mock).toHaveBennCalledWith(categories[0])
    // })

    // it('closeDialogが発火するとcloseCreateDialogが呼ばれる', () => {
    //   wrapper.vm.closeCreateDialog = mock
    //   wrapper.find('createdialog-stub').vm.$emit('closeDialog')
    //   expect(mock).toHaveBeenCalled()
    // })

    // it('addが発火するとaddCategoryTemplateが呼ばれる', () => {
    //   wrapper.vm.addCategoryTemplate = mock
    //   wrapper.find('createdialog-stub').vm.$emit('add')
    //   expect(mock).toHaveBeenCalled()
    // })
  })

  describe('script', () => {
    it('head', () => {
      wrapper.vm.title = 'test'
      expect(wrapper.vm.$metaInfo.title).toEqual('test')
    })

    describe('dragClass', () => {
      it('isDraggableがfalseの時', () => {
        wrapper.vm.isDraggable = false
        expect(wrapper.vm.dragClass).toEqual({
          cgrab: true,
          cgrabbing: false
        })
      })

      // it('isDraggableがtrueの時', () => {
      //   wrapper.vm.isDraggable = true
      //   expect(wrapper.vm.dragClass).toEqual({
      //     cgrab: false,
      //     cgrabbing: true
      //   })
      // })
    })

    describe('methods', () => {
      it('addCategoryTemplate', () => {
        wrapper.vm.addCategory = mock
        wrapper.vm.closeCreateDialog = mock2
        wrapper.vm.addCategoryTemplate()
        expect(mock).toHaveBeenCalledWith({ category: wrapper.vm.newCategory })
        expect(mock2).toHaveBeenCalled()
      })

      // it('removeCategoryTemplate', () => {
      //   const category = categories[0]
      //   wrapper.removeCategory = mock
      //   wrapper.vm.removeCategoryTemplate(category)
      //   expect(mock).toHaveBeenCalled()
      // })

      // it('updateCategoryTemplate', () => {
      //   wrapper.updateCategory = mock
      //   wrapper.updateCategoryTemplate()
      //   expect(mock).toHaveBeenCalledWith({ cateroty: wrapper.vm.updatingCategory })
      // })

      // it('openEditDialog', () => {
      //   const category = categories[0]
      //   wrapper.openEditDialog(category)
      //   expect(wrapper.updatingCategory).toEqual(category)
      // })
    })
  })
})
