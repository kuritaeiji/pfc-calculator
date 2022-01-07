export default {
  computed: {
    pfcs () {
      return new Error('implement pfcs method')
    },
    caloryData () {
      return this.createData(this.pfcs.map(pfc => pfc.calory), this.$t('model.date.calory'))
    },
    proteinData () {
      return this.createData(this.pfcs.map(pfc => pfc.protein), this.$t('model.date.protein'))
    },
    fatData () {
      return this.createData(this.pfcs.map(pfc => pfc.fat), this.$t('model.date.fat'))
    },
    carbonhydrateData () {
      return this.createData(this.pfcs.map(pfc => pfc.carbonhydrate), this.$t('model.date.carbonhydrate'))
    },
    createData () {
      return (data, label) => {
        return {
          labels: this.labels,
          datasets: [
            {
              data,
              label,
              fill: false,
              tension: 0
            }
          ]
        }
      }
    },
    createOptions () {
      const self = this
      return (chartName) => {
        return {
          tooltips: {
            callbacks: {
              label (tooltipItem, data) {
                const index = tooltipItem.index
                const value = data.datasets[0].data[index]
                const label = data.datasets[0].label
                return `${label}: ${value}${self.$t(`unit.${chartName}`)}`
              }
            }
          }
        }
      }
    }
  }
}
