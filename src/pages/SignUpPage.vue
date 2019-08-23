<template>
  <div>
    <v-layout
      justify-center
      mt-5
      pt-5
      row
    >
      <v-flex
        0ffset-xs3
        xs6
      >
        <v-card
          class="elevation-5"
          mt-5
        >
          <v-card-title class="justify-center">
            <h3>Sign Up Here</h3>
          </v-card-title>
          <v-card-text>
            <v-form v-on:submit.prevent="handleUserSignUp">
              <v-text-field
                label="Username"
                required
                v-model="getNewUser.username"
              ></v-text-field>
              <v-text-field
                label="First Name"
                required
                v-model="getNewUser.firstName"
              ></v-text-field>
              <v-text-field
                label="Last Name"
                required
                v-model="getNewUser.lastName"
              ></v-text-field>
              <v-text-field
                label="Email"
                required
                v-model="getNewUser.email"
              ></v-text-field>
              <v-text-field
                :type="passwordVisibility.type"
                label="Password"
                name="password"
                required
                v-model="getNewUser.password"
              >
                <template v-slot:append>
                  <v-icon
                    @mousedown="togglePasswordVisibilty"
                    @mouseup="togglePasswordVisibilty"
                  >{{ passwordVisibility.icon }}</v-icon>
                </template>
              </v-text-field>
              <v-text-field
                :type="passwordVisibility.type"
                label="Confirm Password"
                name="passwordConfirm"
                required
                v-model="getNewUser.passwordConfirm"
              >
                <template v-slot:append>
                  <v-icon
                    @mousedown="togglePasswordVisibilty"
                    @mouseup="togglePasswordVisibilty"
                  >{{ passwordVisibility.icon }}</v-icon>
                </template>
              </v-text-field>
              <p
                class="red--text"
                v-if="signupErrorMessage"
              >{{signupErrorMessage}}</p>
              <v-layout
                justify-space-between
                row
              >
                <v-flex
                  md3
                  xs12
                >
                  <v-btn
                    color="success"
                    type="submit"
                  >Submit</v-btn>
                </v-flex>
                <v-flex
                  md6
                  xs12
                >
                  Already Registered?
                  <v-btn
                    color="primary"
                    flat
                    router
                    to="/login"
                  >
                    Login
                    <v-icon right>person_outline</v-icon>
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  /* eslint-disable-next-line */
  data() {
    return {
      see: false
    }
  },
  methods: {
    /* eslint-disable-next-line */
    handleUserSignUp(e) {
      e.preventDefault()
      if (this.password !== this.passwordConfirm) {
        return alert('Confirm Password Does Not Match')
      }
      this.$store.dispatch('handleUserCreate')
    },
    /* eslint-disable-next-line */
    togglePasswordVisibilty() {
      this.$store.dispatch('togglePasswordVisibility')
    }
    /* eslint-disable-next-line */
  },
  computed: {
    /* eslint-disable-next-line */
    getNewUser() {
      return this.$store.getters.newUser
    },
    /* eslint-disable-next-line */
    passwordVisibility() {
      return this.$store.getters.passwordFieldSettings
    },
    /* eslint-disable-next-line */
    signupErrorMessage() {
      return this.$store.getters.signupErrorMessage
    }
  }
}
</script>
