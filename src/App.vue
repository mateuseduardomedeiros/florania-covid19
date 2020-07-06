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
          <Card titulo="Notificados" v-bind:info="notificados" />
          <Card titulo="Suspeitos" v-bind:info="suspeitos" />
          <Card titulo="Descartados" v-bind:info="descartados" />
          <Card titulo="Curados" v-bind:info="curados" />
          <Card titulo="Confirmados" v-bind:info="confirmados" />
          <Card titulo="Internados" v-bind:info="internados" />
          <Card titulo="Mortes" v-bind:info="mortes" />
          <Card titulo="População estimada" v-bind:info="populacao_est" />
          <Card titulo="Taxa de mortalidade" v-bind:info="mortes_percent" />
        </v-row>
      </v-container>
    </v-main>
    <v-footer light color="primary" dark>
      <v-col class="text-center" cols="12">
        {{ new Date().getFullYear() }} —
        <strong>Eduardo Medeiros</strong>
        | Última atualização: {{date}}
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
import Card from "@/components/Card";

export default {
  name: "App",

  components: {
    Card
  },
  data() {
    return {
      notificados: 235,
      suspeitos: 57,
      descartados: 121,
      curados: 26,
      confirmados: "57 (31 ATIVOS)",
      confirmadosaux: 57,
      internados: 0,
      mortes: 3,
      populacao_est: 9.116,
      date: "05/07/2020"
    };
  },
  computed: {
    mortes_percent: function () {
      return (this.mortes/this.confirmadosaux).toFixed(3).toString() + "%";
    }
  }
};
</script>
<style scoped>
</style>
