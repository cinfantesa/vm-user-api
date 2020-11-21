<template>
  <v-container id="login">
    <v-form
        ref="loginForm"
        v-model="valid"
        lazy-validation
    >
      <v-layout column>
        <v-flex align-self-center><p>Type your credentials</p></v-flex>
        <v-flex>
          <v-text-field
              required
              :rules="validations.email"
              v-model="email"
              label="Email"
              hide-details="auto"/>
        </v-flex>
        <v-flex>
          <v-text-field
              required
              :rules="validations.password"
              v-model="password"
              :type="'password'"
              label="Password"
              hide-details="auto"/>
        </v-flex>
        <v-flex>
          <v-btn
              id="submit"
              :disabled="!valid || isLoading"
              depressed color="primary"
              @click="login">
            Login
          </v-btn>
        </v-flex>
        <v-flex align-self-center>
          <router-link to="register">Register</router-link>
        </v-flex>
      </v-layout>
    </v-form>
    <v-snackbar
        v-model="snackbar"
        :timeout="5000"
    >
      {{ error }}

      <template v-slot:action="{ attrs }">
        <v-btn
            color="blue"
            text
            v-bind="attrs"
            @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import router from '../../router'
import { validations } from '@/shared/user-validations'
import UserService from '@/shared/user-service'

export default {
  name: 'Login',
  data: () => ({
    isLoading: false,
    valid: true,
    validations: {
      email: validations.email,
      password: validations.password
    },
    error: '',
    snackbar: false,
    email: '',
    password: ''
  }),
  methods: {
    async login() {
      if (this.$refs.loginForm.validate()) {
        try {
          this.isLoading = true;
          await UserService.login({
            email: this.email,
            password: this.password
          })
          await router.push({ name: 'Home' })
        } catch (ex) {
          this.error = ex.message
          this.snackbar = true
        } finally {
          this.isLoading = false;
        }
      }
    }
  }
}
</script>

<style scoped>
#login {
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