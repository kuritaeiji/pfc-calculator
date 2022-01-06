<script>
import { Pie, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  mixins: [Pie, reactiveProp],
  props: {
    protein: {
      type: Number,
      required: true
    },
    fat: {
      type: Number,
      required: true
    },
    carbonhydrate: {
      type: Number,
      required: true
    }
  },
  data (self) {
    return {
      data: {
        labels: [this.$t('chart.pfcPie.protein'), this.$t('chart.pfcPie.fat'), this.$t('chart.pfcPie.carbonhydrate')],
        datasets: [
          {
            label: this.$t('chart.pfcPie.name'),
            backgroundColor: ['#F44336', '#FFEB3B', '#4CAF50'],
            data: [this.protein, this.fat, this.carbonhydrate]
          }
        ]
      },
      options: {
        tooltips: {
          callbacks: {
            label (tooltipItem, data) {
              const index = tooltipItem.index
              const label = data.labels[index]
              const value = data.datasets[0].data[index]
              const sum = self.protein + self.fat + self.carbonhydrate
              const percentage = Math.round(value / sum * 1000) / 10
              return `${label}: ${percentage}% (${value}g)`
            }
          }
        }
      }
    }
  },
  mounted () {
    this.renderChart(this.data, this.options)
  }
}
</script>
