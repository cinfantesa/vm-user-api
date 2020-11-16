<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dense
      dark
    >
      <v-toolbar-title>Login</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  components: {},

  data: () => ({
    //
  }),
};
</script>
