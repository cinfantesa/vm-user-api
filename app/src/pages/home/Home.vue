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
              depressed color="error">
            Remove
          </v-btn>
          <v-btn
              id="submit"
              @click="update"
              :disabled="!valid"
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
        await UserService.remove(this.user)
        await router.push({ name: 'Login' })
      } catch (ex) {
        console.error(ex)
      }
    },
    async update() {
      if (this.$refs.homeForm.validate()) {
        await UserService.update({
          user: this.user,
          newPassword: this.newPassword
        })
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