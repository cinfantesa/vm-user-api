<template>
  <v-app id="app-container">
    <v-app-bar
        id="appBar"
        app
        color="primary"
        dense
        dark>
      <v-toolbar-title>Voicemod</v-toolbar-title>
    </v-app-bar>

    <v-main id="main-content">
      <router-view/>
    </v-main>
    <v-snackbar
        v-model="snackbar"
        :timeout="5000">
      {{ error }}

      <template v-slot:action="{ attrs }">
        <v-btn
            color="blue"
            text
            v-bind="attrs"
            @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  components: {},

  data: () => ({
    error: '',
    snackbar: false
  }),
  errorCaptured(err) {
    this.error = err
    this.snackbar = true
  }
}
</script>

<style>
#main-content {
  margin-top: 40px;
}
</style>
