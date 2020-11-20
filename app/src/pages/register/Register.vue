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
            <v-text-field required v-model="user.name" :rules="validations.name" label="Name" hide-details="auto"/>
          </v-flex>
          <v-flex>
            <v-text-field required v-model="user.surnames" :rules="validations.surnames" label="Surnames" hide-details="auto"/>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex>
            <v-text-field required v-model="user.email" :rules="validations.email" label="Email" hide-details="auto"/>
          </v-flex>
          <v-flex>
            <v-text-field required v-model="user.password" :rules="validations.password" :type="'password'"   label="Password" hide-details="auto"/>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex>
            <v-text-field required v-model="user.postalCode" :rules="validations.postalCode" label="Postal Code" hide-details="auto"/>
          </v-flex>
          <v-flex>
            <v-text-field required v-model="user.country" :rules="validations.country" label="Country" hide-details="auto"/>
          </v-flex>
          <v-flex>
            <v-text-field required v-model="user.phone" :rules="validations.phone" label="Phone" hide-details="auto"/>
          </v-flex>
        </v-layout>
        <v-flex align-self-end>
          <v-btn
              id="submit"
              :disabled="!valid"
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
import axios from 'axios';
import router from '@/router';
import ObjectID from'bson-objectid'

export default {
  data: () => ({
    valid: true,
    validations: {
      name: [
        v => !!v || 'Name is required'
      ],
      surnames: [
        v => !!v || 'Surnames are required'
      ],
      email: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      password: [
        v => !!v || 'Password is required'
      ],
      postalCode: [
        v => !!v || 'Postal code is required'
      ],
      country: [
        v => !!v || 'Country is required'
      ],
      phone: [
        v => !!v || 'Phone is required'
      ]
    },
    user: {
      email: '',
      password: '',
      firstName: '',
      surnames: '',
      postalCode: '',
      country: '',
      phone: ''
    }
  }),
  methods: {
    async register() {
      this.$refs.registerForm.validate();

      try {
        await axios.post('http://localhost:3000/users',
          Object.assign({}, this.user, {id: ObjectID()}))
        await router.push({ name: 'Login' })
      } catch (ex) {
        console.error(ex)
      }
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
</style>