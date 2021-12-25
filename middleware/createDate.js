export default ({ params, store }) => {
  store.dispatch('date/addDate', { date: { dating: params.date } })
  const date = store.getters['date/findDate'](params.date)
  store.dispatch('body/addBody', { date })
}
