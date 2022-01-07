export default {
  computed: {
    chartData () {
      return {
        labels: [this.$t('chart.pfcPie.protein'), this.$t('chart.pfcPie.fat'), this.$t('chart.pfcPie.carbonhydrate')],
        datasets: [
          {
            data: [this.pfc.protein, this.pfc.fat, this.pfc.carbonhydrate],
            backgroundColor: ['#F44336', '#FFEB3B', '#4CAF50']
          }
        ]
      }
    },
    options () {
      const self = this
      return {
        tooltips: {
          callbacks: {
            label (tooltipItem, data) {
              const index = tooltipItem.index
              const label = data.labels[index]
              const value = data.datasets[0].data[index]
              const sum = self.pfc.protein + self.pfc.fat + self.pfc.carbonhydrate
              const percentage = Math.round(value / sum * 1000) / 10
              return `${label}: ${percentage}% (${value}g)`
            }
          }
        }
      }
    }
  }
}
// computedにpfcがある
