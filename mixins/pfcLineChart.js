export default {
  computed: {
    pfcs () {
      return new Error('implement pfcs method')
    },
    caloryData () {
      return this.createData([this.createDataset(this.pfcs.map(pfc => pfc.calory), this.$t('model.date.calory'))])
    },
    pfcData () {
      return this.createData([this.proteinDataset, this.fatDataset, this.carbonhydrateDataset])
    },
    proteinDataset () {
      return this.createDataset(this.pfcs.map(pfc => pfc.protein), this.$t('model.date.protein'), '#F44336')
    },
    fatDataset () {
      return this.createDataset(this.pfcs.map(pfc => pfc.fat), this.$t('model.date.fat'), '#FFEB3B')
    },
    carbonhydrateDataset () {
      return this.createDataset(this.pfcs.map(pfc => pfc.carbonhydrate), this.$t('model.date.carbonhydrate'), '#4CAF50')
    },
    createData () {
      return (datasets) => {
        // datasetsはdatasetの配列
        return {
          labels: this.labels,
          datasets
        }
      }
    },
    createDataset () {
      return (data, label, color) => {
        const borderColor = color ? { borderColor: color } : {}
        return {
          data,
          label,
          fill: false,
          tension: 0,
          ...borderColor
        }
      }
    },
    createOptions () {
      return (unit) => {
        return {
          tooltips: {
            callbacks: {
              label (tooltipItem, data) {
                // indexはx軸の日付インデックス
                const index = tooltipItem.index
                // datasetIndexはpfcのindex
                const datasetIndex = tooltipItem.datasetIndex
                const value = data.datasets[datasetIndex].data[index]
                const label = data.datasets[datasetIndex].label
                return `${label}: ${value}${unit}`
              }
            }
          }
        }
      }
    }
  }
}
