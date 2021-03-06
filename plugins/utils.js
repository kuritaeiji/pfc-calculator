class Utils {
  constructor (app) {
    this.app = app
  }

  formatDate (date) {
    return this.app.$moment(date).format('YYYY-MM-DD')
  }

  formatMonth (date) {
    return this.app.$moment(date).format('YYYY-MM')
  }

  formatOnlyMonthDay (date) {
    return this.app.$moment(date).format('M/D')
  }
}

export default ({ app }, inject) => {
  inject('utils', new Utils(app))
}
