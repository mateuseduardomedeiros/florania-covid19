<template>
  <v-col cols="12" sm="12" md="4">
    <v-card outlined>
      <v-card-title>{{titulo}}</v-card-title>
      <v-card-text>{{info}}</v-card-text>
    </v-card>
  </v-col>
</template>

<script>
export default {
  name: "Card",
  props: ["titulo", "info"]
};
</script>
<style scoped>
</style>
