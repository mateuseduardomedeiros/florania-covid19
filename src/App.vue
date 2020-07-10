<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-row align="center">
        <v-col cols="12">
          <div class="d-flex align-center">
            <v-img
              alt="Brasão de Florânia"
              class="shrink mr-2"
              contain
              src="@/assets/logo.png"
              transition="scale-transition"
              width="50"
            />
            <h5>FLORÂNIA RN</h5>
          </div>
        </v-col>
      </v-row>
      <h3>COVID-19</h3>
    </v-app-bar>
    <v-main style="background-color: #FFF;">
      <v-container fluid>
        <v-row>
          <Card
            icon="account"
            :md="4"
            color="#53BD9D"
            titulo="População Estimada"
            :info="populacao_est"
          />
          <Card
            icon="clipboard-file"
            :md="4"
            color="#CCC100"
            titulo="Notificados"
            :info="registroAtual.notificados"
          />
          <Card
            icon="account-alert"
            :md="4"
            color="#E67F36"
            titulo="Suspeitos"
            :info="registroAtual.suspeitos"
          />
          <Card icon="alert" :md="4" color="#E74C3C" titulo="Confirmados" :info="confirmados" />
          <Card
            icon="printer-3d-nozzle"
            :md="4"
            color="#8F4EAD"
            titulo="Internados"
            :info="registroAtual.internados"
          />
          <Card icon="check" :md="4" color="#2980B9" titulo="Curados" :info="curados" />
          <Card icon="christianity" :md="4" color="#2D3436" titulo="Óbitos" :info="mortes" />
          <Card
            icon="skull-crossbones"
            :md="4"
            color="#2D3436"
            titulo="Taxa de Mortalidade"
            :info="taxa_mortalidade"
          />
          <Card
            icon="close-octagon"
            :md="4"
            color="#52AF61"
            titulo="Descartados"
            :info="registroAtual.descartados"
          />
          <!-- <v-col cols="12">
            <v-row align="center" justify="center">
              <Card :md="6"
                class="justify-center"
                color="#52AF61"
                titulo="Descartados"
                :info="registroAtual.descartados"
              />
            </v-row>
          </v-col>-->
        </v-row>
      </v-container>
      <v-spacer></v-spacer>
      <v-container fluid>
        <v-row v-if="arrSuspeitos.length > 0 && arrConfirmados.length > 0 && arrCurados.length > 0">
          <v-col cols="12" sm="12" md>
            <LineAllChart
              :chartDataSuspeitos="arrSuspeitos"
              :chartDataConfirmados="arrConfirmados"
              :chartDataCurados="arrCurados"
              :options="chartAllOptions"
            />
          </v-col>
        </v-row>
        <v-row v-if="arrConfirmados.length > 0">
          <v-col cols="12" sm="4" md="4">
            <LineChart
              color="#EA9248"
              class="chartBar"
              :chartData="arrSuspeitos"
              :options="chartOptions"
              label="Progressão de Casos Suspeitos"
            />
          </v-col>
          <v-col cols="12" sm="4" md="4">
            <LineChart
              color="#E86055"
              class="chartBar"
              :chartData="arrConfirmados"
              :options="chartOptions"
              label="Progressão de Casos Confirmados"
            />
          </v-col>
          <v-col cols="12" sm="4" md="4">
            <LineChart
              color="#4D95C5"
              class="chartBar"
              :chartData="arrCurados"
              :options="chartOptions"
              label="Progressão de Casos Curados"
            />
          </v-col>
        </v-row>
      </v-container>
      <!-- <v-container fluid>
        <v-row v-if="arrSuspeitos.length > 0 && arrConfirmados.length > 0 && arrCurados.length > 0">
          <v-col cols="12" sm="12" md>
            <LineAllChart
              :chartDataSuspeitos="arrSuspeitos"
              :chartDataConfirmados="arrConfirmados"
              :chartDataCurados="arrCurados"
              :options="chartAllOptions"
            />
          </v-col>
        </v-row>
      </v-container> -->
    </v-main>
    <v-footer light color="primary" dark>
      <v-col class="text-center" cols="12">
        {{ new Date().getFullYear() }} —
        <strong>Eduardo Medeiros</strong>
        | Última atualização: {{registroAtual.data}} | Dados das publicações da
        <strong>Secretaria Municipal de Saúde de Florânia</strong>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
import Card from "@/components/Card";
import LineChart from "@/components/Line";
import LineAllChart from "@/components/LineAll";
import moment from "moment";

export default {
  name: "App",

  components: {
    Card,
    LineChart,
    LineAllChart
  },
  data() {
    return {
      chartAllOptions: {
        elements: {
          point: {
            radius: 0
          }
        },
        responsive: true,
        maintainAspectRatio: false,
        tooltips: {
          enabled: true,
          mode: "index",
          intersect: false
        },
        scales: {
          xAxes: [
            {
              ticks: {
                //mostra somente primeiro e ultimo valor do label x
                autoSkip: false,
                callback: (value, index, values) => {
                  //var meio = (((values.length - 1)/2).toFixed(0))
                  if (index == 0 || index == values.length - 1) {
                    return value;
                  }
                }
              }
            }
          ]
        }
      },
      chartOptions: {
        elements: {
          point: {
            radius: 0
          }
        },
        responsive: true,
        maintainAspectRatio: false,
        tooltips: {
          enabled: true,
          mode: "index",
          intersect: false
        },
        scales: {
          xAxes: [
            {
              ticks: {
                //mostra somente primeiro e ultimo valor do label x
                autoSkip: false,
                callback: (value, index, values) => {
                  //var meio = (((values.length - 1)/2).toFixed(0))
                  if (index == 0 || index == values.length - 1) {
                    return value;
                  }
                }
              }
            }
          ]
        }
      },
      registroAtual: {},
      registroAll: [],
      arrConfirmados: [],
      arrCurados: [],
      arrSuspeitos: [],
      populacao_est: "9.116 (IBGE 2019)"
    };
  },
  async created() {
    this.carregarRegistroAtual();
  },
  mounted() {
    this.carregarDadosConfirmados();
  },
  computed: {
    confirmados: function() {
      return `${this.registroAtual.confirmados} (${this.registroAtual
        .confirmados -
        this.registroAtual.mortes -
        this.registroAtual.curados} ATIVOS)`;
    },
    curados: function() {
      return `${this.registroAtual.curados} (${(
        (this.registroAtual.curados / this.registroAtual.confirmados) *
        100
      ).toFixed(0)}% DOS CONFIRMADOS)`;
    },
    mortes: function() {
      return `${this.registroAtual.mortes} (${(
        this.registroAtual.mortes / this.registroAtual.confirmados
      ).toFixed(3)}%)`;
    },
    taxa_mortalidade: function() {
      return `${(
        this.registroAtual.mortes / this.registroAtual.confirmados
      ).toFixed(3)}%`;
    }
  },
  methods: {
    carregarRegistroAtual() {
      this.$axios.get("registros/last").then(response => {
        this.registroAtual = response.data;
      });
    },
    async carregarDadosConfirmados() {
      const all = await this.$axios.get("registros");
      all.data.forEach(element => {
        const data = moment(element.data, "DD/MM/YYYY").format("DD/MM");

        const {
          // notificados,
          suspeitos,
          confirmados,
          // internados,
          // mortes,
          curados
          // descartados
        } = element;

        this.arrConfirmados.push({ data, total: confirmados });
        this.arrCurados.push({ data, total: curados });
        this.arrSuspeitos.push({ data, total: suspeitos });
      });
    }
  }
};
</script>
<style scoped>
</style>
