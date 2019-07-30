<template>
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
              label="Password"
              required
              v-model="getNewUser.password"
              name="password"
              :type="passwordVisibility.type"
              :append-icon="passwordVisibility.icon"
              @click:append="togglePasswordVisibilty"
            ></v-text-field>
            <v-text-field
              label="Confirm Password"
              required
              name="passwordConfirm"
              v-model="getNewUser.passwordConfirm"
              :type="passwordVisibility.type"
              :append-icon="passwordVisibility.icon"
              @click:append="togglePasswordVisibilty"
            ></v-text-field>
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
</template>

<script>
export default {
  /* eslint-disable-next-line */
  data() {
    return {}
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
    togglePasswordVisibilty () {
      this.$store.dispatch('togglePasswordVisibility')
    }
  },
  computed: {
    /* eslint-disable-next-line */
    getNewUser() {
      return this.$store.getters.newUser
    },
    /* eslint-disable-next-line */
    passwordVisibility () {
      return this.$store.getters.passwordFieldSettings
    }
  }
}
</script>
