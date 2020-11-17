<template>
  <v-container id="login">
    <v-layout column>
      <v-flex align-self-center><p>Introduce tus credenciales</p></v-flex>
      <v-flex>
        <v-text-field label="Email" hide-details="auto"/>
      </v-flex>
      <v-flex>
        <v-text-field label="Password" hide-details="auto"/>
      </v-flex>
      <v-flex>
        <v-btn id="submit" depressed color="primary">Entrar</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {}
</script>

<style scoped>
  #login {
    padding-top: 40px;
    width: 460px;
    height: 100%;
  }

  #submit {
    margin-top: 60px;
    width: 100%;
  }

  .v-text-field {
    padding-top: 40px;
  }
</style>