export default ({ params, redirect, store }) => {
  if (new Date(params.date) > new Date()) {
    store.dispatch('snackbar/setSnackbar', {
      snackbar: {
        message: '未来の日付は選択できません',
        isShow: true
      }
    })
    redirect('/')
  }
}
