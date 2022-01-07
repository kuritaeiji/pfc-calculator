export default {
  data () {
    return {
      date: this.$utils.formatDate(new Date())
    }
  },
  computed: {
    labels () {
      const labels = []
      for (let i = 0; i < 10; i++) {
        labels.unshift(this.$moment(new Date(this.date)).subtract(i, 'd').format('YYYY-MM-DD'))
      }
      return labels
    }
  }
}
