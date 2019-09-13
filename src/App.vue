<template>
  <v-app>
    <v-toolbar
      :class="color"
      app
      class="lighten-3"
    >
      <v-toolbar-title class="headline text-uppercase">
        <span>My Media</span>
        <span class="font-weight-light">Library</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu
        offset-y
        v-if="!guestRoute"
      >
        <template v-slot:activator="{ on }">
          <v-btn
            flat
            v-on="on"
          >
            <v-icon left>expand_more</v-icon>
            <span>Libraries</span>
          </v-btn>
        </template>
        <v-list>
          <v-list-tile
            :key="link.text"
            :to="link.route"
            router
            v-for="link in links"
          >
            <v-list-tile-title>
              <v-icon left>{{ link.icon }}</v-icon>
              <span>{{ link.text }}</span>
            </v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
      <v-menu
        offset-y
        v-if="!guestRoute"
      >
        <template v-slot:activator="{ on }">
          <v-btn
            flat
            v-on="on"
          >
            <v-icon left>expand_more</v-icon>
            <span>Profile</span>
          </v-btn>
        </template>
        <v-list>
          <v-list-tile
            router
            to="/settings"
          >
            <v-list-tile-title>
              <v-icon left>settings</v-icon>
              <span>Settings</span>
            </v-list-tile-title>
          </v-list-tile>
          <v-list-tile @click="handleLogout">
            <v-list-tile-title>
              <v-icon left>exit_to_app</v-icon>
              <span>Logout</span>
            </v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
      <v-toolbar-items></v-toolbar-items>
    </v-toolbar>
    <v-content class="grey lighten-1">
      <v-container>
        <router-view
          mt5
          pt5
        ></router-view>
      </v-container>
    </v-content>
    <v-footer
      dark
      height="auto"
    >
      <v-card
        :class="color"
        class="flex lighten-3 justify-center"
        flat
        tile
      >
        <v-card-title class="justify-center black--text pb-0">
          &copy;{{ time | formatTime('YYYY') }} &nbsp;
          <strong>Daniel Strawbridge</strong>
        </v-card-title>
        <v-card-actions
          class="caption grey--text justify-center"
        >This product uses the TMDb API but is not endorsed or certified by TMDb.</v-card-actions>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  /* eslint-disable-next-line */
  data() {
    return {
      links: [
        { text: 'Home', route: '/', icon: 'home' },
        { text: 'Movies', route: '/movies', icon: 'movie' },
        { text: 'Books', route: '/books', icon: 'book' },
        { text: 'Games', route: '/games', icon: 'videogame_asset' },
        { text: 'Music', route: '/albums', icon: 'library_music' }
      ]
    }
  },
  methods: {
    /* eslint-disable-next-line */
    handleLogout(e) {
      e.preventDefault()
      this.$store.dispatch('logoutUser')
    }
  },
  computed: {
    /* eslint-disable-next-line */
    guestRoute() {
      return this.$router.app._route.meta.guest
    },
    /* eslint-disable-next-line */
    time() {
      return new Date()
    },
    /* eslint-disable-next-line */
    color() {
      return this.$store.getters.userColor || 'success'
    }
  },
  /* eslint-disable-next-line */
  beforeMount() {}
}
</script>

<style slot-scoped>
a {
  text-decoration: none;
}
</style>
