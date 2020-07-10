<script>
// CommitChart.js
import { Line } from "vue-chartjs";

export default {
  extends: Line,
  props: {
    chartDataSuspeitos: {
      type: Array
    },
    chartDataConfirmados: {
      type: Array
    },
    chartDataCurados: {
      type: Array
    },
    options: {
      type: Object
    },
  },
  mounted() {
    const datas = this.chartDataSuspeitos.map(element => element.data); //data de qualquer ja que todos sao iguais
    const totalSuspeitos = this.chartDataSuspeitos.map(element => element.total);
    const totalConfirmados = this.chartDataConfirmados.map(element => element.total);
    const totalCurados = this.chartDataCurados.map(element => element.total);
    this.renderChart(
      {
        labels: datas,
        datasets: [
          {
            label: "Casos Suspeitos",
            data: totalSuspeitos,
            backgroundColor: "#E67F36",
            borderColor: "#E67F36",
            fill: false,
          },
          {
            label: "Casos Confirmados",
            data: totalConfirmados,
            backgroundColor: "#E74C3C",
            borderColor: "#E74C3C",
            fill: false,
          },
          {
            label: "Casos Curados",
            data: totalCurados,
            backgroundColor: "#2980B9",
            borderColor: "#2980B9",
            fill: false,
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