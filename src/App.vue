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
    <v-main>
      <v-container fluid>
        <v-row>
          <Card titulo="Notificados" v-bind:info="registroAtual.notificados" />
          <Card titulo="Suspeitos" v-bind:info="registroAtual.suspeitos" />
          <Card titulo="Descartados" v-bind:info="registroAtual.descartados" />
          <Card titulo="Curados" v-bind:info="registroAtual.curados" />
          <Card titulo="Confirmados" v-bind:info="confirmados" />
          <Card titulo="Internados" v-bind:info="registroAtual.internados" />
          <Card titulo="Mortes" v-bind:info="registroAtual.mortes" />
          <Card titulo="População estimada" v-bind:info="populacao_est" />
          <Card titulo="Taxa de mortalidade" v-bind:info="mortes_percent" />
        </v-row>
      </v-container>
      <v-spacer></v-spacer>
      <v-container fluid>
        <v-row v-if="arrConfirmados.length > 0">
          <v-col cols="12" sm="4" md="4">
            <Bar
              class="chartBar"
              :chartData="arrSuspeitos"
              :options="chartOptions"
              label="Progressão de Casos Suspeitos"
            />
          </v-col>
          <v-col cols="12" sm="4" md="4">
            <Bar
              class="chartBar"
              :chartData="arrConfirmados"
              :options="chartOptions"
              label="Progressão de Casos Confirmados"
            />
          </v-col>
          <v-col cols="12" sm="4" md="4">
            <Bar
              class="chartBar"
              :chartData="arrCurados"
              :options="chartOptions"
              label="Progressão de Casos Curados"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <v-footer light color="primary" dark>
      <v-col class="text-center" cols="12">
        {{ new Date().getFullYear() }} —
        <strong>Eduardo Medeiros</strong>
        | Última atualização: {{registroAtual.data}} | Dados da
        <strong>Secretaria Municipal de Saúde de Florânia</strong>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
import Card from "@/components/Card";
import Bar from "@/components/Bar";
import moment from "moment";

export default {
  name: "App",

  components: {
    Card,
    Bar
  },
  data() {
    return {
      chartOptions: { responsive: true, maintainAspectRatio: false },
      registroAtual: {},
      registroAll: [],
      arrConfirmados: [],
      arrCurados: [],
      arrSuspeitos: [],
      populacao_est: 9.116
    };
  },
  async created() {
    this.carregarRegistroAtual();
  },
  mounted() {
    this.carregarDadosConfirmados();
  },
  computed: {
    mortes_percent: function() {
      return (
        (this.registroAtual.mortes / this.registroAtual.confirmados)
          .toFixed(3)
          .toString() + "%"
      );
    },
    confirmados: function() {
      return `${this.registroAtual.confirmados} (${this.registroAtual
        .confirmados -
        this.registroAtual.mortes -
        this.registroAtual.curados} ATIVOS)`;
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
