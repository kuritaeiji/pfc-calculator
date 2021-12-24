export default ({ params, redirect }) => {
  if (new Date(params.date) > new Date()) {
    redirect('/')
  }
}
