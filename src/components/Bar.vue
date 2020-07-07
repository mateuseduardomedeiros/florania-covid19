<script>
// CommitChart.js
import { Line } from "vue-chartjs";

export default {
  extends: Line,
  props: {
    label: {
      type: String
    },
    chartData: {
      type: Array
    },

    options: {
      type: Object
    }
  },
  mounted() {
    const datas = this.chartData.map(element => element.data);
    const total = this.chartData.map(element => element.total);
    this.renderChart(
      {
        labels: datas,
        datasets: [
          {
            label: this.label,
            data: total,
            backgroundColor: "#3D844A"
          }
        ]
      },
      this.options
    );
  }
};
</script>

<style>
</style>