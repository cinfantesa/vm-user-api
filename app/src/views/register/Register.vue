<template>
  <v-container id="register">
    <v-form
        ref="registerForm"
        v-model="valid"
        lazy-validation
    >
      <v-layout column>
        <v-layout>
          <v-flex>
            <v-text-field
                required
                v-model="user.name"
                :rules="validations.name"
                label="Name"
                hide-details="auto"/>
          </v-flex>
          <v-flex>
            <v-text-field
                required
                v-model="user.surnames"
                :rules="validations.surnames"
                label="Surnames"
                hide-details="auto"/>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex>
            <v-text-field
                required
                v-model="user.email"
                :rules="validations.email"
                label="Email"
                hide-details="auto"/>
          </v-flex>
          <v-flex>
            <v-text-field
                required
                v-model="user.password"
                :rules="validations.password"
                :type="'password'"
                label="Password"
                hide-details="auto"/>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex>
            <v-text-field
                required
                v-model="user.postalCode"
                :rules="validations.postalCode"
                label="Postal Code"
                hide-details="auto"/>
          </v-flex>
          <v-flex>
            <v-text-field
                required
                v-model="user.country"
                :rules="validations.country"
                label="Country"
                hide-details="auto"/>
          </v-flex>
          <v-flex>
            <v-text-field
                required
                v-model="user.phone"
                :rules="validations.phone"
                label="Phone"
                hide-details="auto"/>
          </v-flex>
        </v-layout>
        <v-flex align-self-end>
          <v-btn
              id="back"
              @click="back"
              depressed color="primary">
            Back
          </v-btn>
          <v-btn
              id="submit"
              :disabled="!valid || isLoading"
              @click="register"
              depressed color="primary">
            Register
          </v-btn>
        </v-flex>
      </v-layout>
    </v-form>
  </v-container>
</template>

<script>
import router from '@/router'
import { validations } from '@/shared/user-validations'
import UserService from '@/shared/user-service'
import User from '@/shared/user';

export default {
  data: () => ({
    isLoading: false,
    valid: true,
    validations: {
      name: validations.name,
      surnames: validations.surnames,
      email: validations.email,
      password: validations.password,
      postalCode: validations.postalCode,
      country: validations.country,
      phone: validations.phone
    },
    user: new User({})
  }),
  methods: {
    async register() {
      if (this.$refs.registerForm.validate()) {
        try {
          this.isLoading = true
          await UserService.register(this.user)
          await router.push({ name: 'Login' })
        } catch (ex) {
          console.error(ex)
        } finally {
          this.isLoading = false
        }
      }
    },
    back() {
      router.push({ name: 'Login' })
    }
  }
}
</script>

<style scoped>
#register {
  height: 100%;
  width: 60%;
}

.v-text-field {
  padding: 30px;
}

.v-btn {
  margin-left: 20px;
}
</style>