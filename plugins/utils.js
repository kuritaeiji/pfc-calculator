class Utils {
  constructor (app) {
    this.app = app
  }

  formatDate (date) {
    return this.app.$moment(date).format('YYYY-MM-DD')
  }
}

export default ({ app }, inject) => {
  inject('utils', new Utils(app))
}
