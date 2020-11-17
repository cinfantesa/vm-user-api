<template>
  <v-app id="app-container">
    <v-app-bar
      id="appBar"
      app
      color="primary"
      dense
      dark
    >
      <v-toolbar-title>Voicemod</v-toolbar-title>
    </v-app-bar>

    <v-main id="main-content">
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  components: {},

  data: () => ({
  }),
};
</script>

<style>
</style>
