<template>
<div class="loginContainer">
  <v-container
    grid-list-md
    text-xs-center
  >
    <v-layout
      row
      wrap
      justify-center
    >

      <v-flex
        xs12 sm6 md6 lg5
        class="pt-5  mt-5"
      >

        <v-card flat class="light_gray_border">
          <v-layout
            align-left
            row
            fill-height
          >
            <v-flex xs7>
              <p class="regLoginHead color_666">Register</p>
            </v-flex>
          </v-layout>
          <v-form class="regLoginForm">
            <v-container class="my-4">
                <v-text-field
                outline
                v-model="name"
                name="name"
                type="text"
                :error-messages="nameErrors"
                label="Name"
                @blur="$v.name.$touch()"
              ></v-text-field>
              <v-text-field
                outline
                v-model="email"
                name="email"
                type="email"
                :error-messages="emailErrors"
                label="Email"
                @blur="$v.email.$touch()"
              ></v-text-field>
              <v-text-field
                outline
                v-model="password"
                :error-messages="passwordErrors"
                name="password"
                type="password"
                label="Password"
                @click:append="showPswd = !showPswd"
                @blur="$v.password.$touch()"
              ></v-text-field>

              <v-btn
                color="#4d76e1"
                style="color:#fff"
                :disabled="!email || !password"
                @click="register({name:name,email:email,password:password})"
              >
                Submit
              </v-btn>
              <v-layout row>
                <v-flex>
                  <p
                    class="color_666"
                    style="color:#2c3e50;"
                  >Already registered? &nbsp;&nbsp;
                    <router-link :to="{ name: 'login' }">Login</router-link>
                  </p>
                </v-flex>
              </v-layout>
            </v-container>

          </v-form>
          <v-card-actions>
            
          </v-card-actions>
        </v-card>

      </v-flex>

    </v-layout>
  </v-container>
</div>
</template>

<script>
import axios from "axios";
import { validationMixin } from 'vuelidate'
import { email, required, minLength } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],
  validations: {
      name: {required, name},
    email: { required, email },
    password: { required, minLength: minLength(8) }
  },
  data () {
    return {      
      valid: true,
      name: '',
      email: '',
      password: ''
    }
  },
  computed: {
      nameErrors () {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.name.required && errors.push('Name is required')
      return errors
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email &&
        errors.push('Invalid Email');
      !this.$v.email.required && errors.push('Email is required');
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.minLength &&
        errors.push('Minimum 8 characters required');
      !this.$v.password.required &&
        errors.push('Password is required');
      return errors;
    }
  },
  methods: {
    register(obj){
      let _this = this;
        this.$http
        .post("/register", obj)
        .then(function(response) {
          if (response.data.success) {
            _this.$router.push({ name: 'login' })
          } else{
            alert("invalid inputs");
          }          
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
}
</script>

<style scoped>
.application.theme--dark input[type='text'] {
  border: 1px solid #555 !important;
}
a {
  text-decoration: none;
}
</style>
