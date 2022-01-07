export default {
  data () {
    return {
      month: this.$utils.formatMonth(new Date())
    }
  },
  computed: {
    labels () {
      const labels = []
      for (let i = 0; i < 10; i++) {
        const monthString = this.$moment(new Date(this.month)).subtract(i, 'M').format('YYYY-MM')
        labels.unshift(monthString)
      }
      return labels
    }
  }
}
