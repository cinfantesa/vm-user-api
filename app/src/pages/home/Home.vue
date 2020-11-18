<template>
  <v-container id="register">
    <v-form
        ref="registerForm"
    >
      <v-layout column>
        <v-layout>
          <v-flex>
            <v-text-field
                label="Name"
                hide-details="auto"/>
          </v-flex>
          <v-flex>
            <v-text-field
                label="Surnames"
                hide-details="auto"/>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex>
            <v-text-field
                label="Email"
                hide-details="auto"/>
          </v-flex>
          <v-flex>
            <v-text-field
                label="Password"
                hide-details="auto"/>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex>
            <v-text-field
                label="Postal Code"
                hide-details="auto"/>
          </v-flex>
          <v-flex>
            <v-text-field
                label="Country"
                hide-details="auto"/>
          </v-flex>
          <v-flex>
            <v-text-field
                label="Phone"
                hide-details="auto"/>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-btn
              id="remove"
              depressed color="error">
            Remove
          </v-btn>
          <v-btn
              id="submit"
              depressed color="primary">
            Register
          </v-btn>
        </v-layout>
      </v-layout>
    </v-form>
  </v-container>
</template>

<script>
export default {}
</script>

<style scoped>
#register {
  height: 100%;
  width: 60%;
}

.v-text-field {
  /*padding: 30px;*/
}
</style>