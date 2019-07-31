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
          <h3>Login</h3>
        </v-card-title>
        <v-card-text>
          <v-form v-on:submit.prevent="handleUserLogin">
            <v-text-field
              label="Email"
              required
              v-model="returningUser.email"
            ></v-text-field>
            <v-text-field
              :type="passwordVisibility.type"
              label="Password"
              required
              v-model="returningUser.password"
            >
              <template v-slot:append>
                <v-icon
                  @mousedown="togglePasswordVisibilty"
                  @mouseup="togglePasswordVisibilty"
                >{{ passwordVisibility.icon }}</v-icon>
              </template>
            </v-text-field>
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
                <span>Not Registered?</span>
                <v-btn
                  color="primary"
                  flat
                  router
                  to="/signup"
                >
                  Sign Up
                  <v-icon right>person_add</v-icon>
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
  methods: {
    /* eslint-disable-next-line */
    handleUserLogin(e) {
      e.preventDefault()
      this.$store.dispatch('loginUser')
    },
    /* eslint-disable-next-line */
    togglePasswordVisibilty() {
      this.$store.dispatch('togglePasswordVisibility')
    }
  },
  computed: {
    /* eslint-disable-next-line */
    returningUser() {
      return this.$store.getters.newUser
    },
    /* eslint-disable-next-line */
    passwordVisibility() {
      return this.$store.getters.passwordFieldSettings
    }
  }
}
</script>
