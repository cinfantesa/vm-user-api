<template>
  <v-container id="home">
    <v-form
        ref="homeForm"
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
          <v-flex>
            <v-text-field
                required
                v-model="newPassword"
                :rules="validations.password"
                :type="'password'"
                label="New Password"
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
              id="remove"
              @click="remove"
              :disabled="isLoading"
              depressed color="error">
            Remove
          </v-btn>
          <v-btn
              id="submit"
              @click="update"
              :disabled="!valid || isLoading"
              depressed color="primary">
            Update
          </v-btn>
        </v-flex>
      </v-layout>
    </v-form>
  </v-container>
</template>

<script>
import UserService from '@/shared/user-service';
import { validations } from '@/shared/user-validations';
import router from "@/router";

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
    user: UserService.loggedUser,
    newPassword: ''
  }),
  methods: {
    async remove() {
      try {
        this.isLoading = true
        await UserService.remove(this.user)
        await router.push({ name: 'Login' })
      } finally {
        this.isLoading = false
      }
    },
    async update() {
      if (this.$refs.homeForm.validate()) {
        try {
          this.isLoading = true
          await UserService.update({
            user: this.user,
            newPassword: this.newPassword
          })
          this.user.password = ''
          this.newPassword = ''
        } finally {
          this.isLoading = false
        }
      }
    }
  }
}
</script>

<style scoped>
#home {
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