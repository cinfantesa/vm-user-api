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
              :rules="emailRules"
              v-model="email"
              label="Email"
              hide-details="auto"/>
        </v-flex>
        <v-flex>
          <v-text-field
              required
              :rules="passwordRules"
              v-model="password"
              label="Password"
              hide-details="auto"/>
        </v-flex>
        <v-flex>
          <v-btn
              id="submit"
              :disabled="!valid"
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
  </v-container>
</template>

<script>
import axios from 'axios';
import router from '../../router';

export default {
  name: 'Login',
  data: () => ({
    valid: true,
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
    password: '',
    passwordRules: [
      v => !!v || 'Password is required'
    ]
  }),
  methods: {
    async login() {
      this.$refs.loginForm.validate();
      try {
        const response = await axios.post('http://localhost:3000/login', {
          email: this.email,
          password: this.password
        })

        const { token } = response.data
        localStorage.setItem('token', token)
        await router.push({ name: 'Home' })
      } catch (ex) {
        console.error(ex)
      }
    }
  }
}
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