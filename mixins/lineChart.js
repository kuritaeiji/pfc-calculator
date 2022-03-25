export default {
  computed: {
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
