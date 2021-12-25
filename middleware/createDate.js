export default ({ params, store }) => {
  store.dispatch('date/addDate', { date: { dating: params.date } })
}
