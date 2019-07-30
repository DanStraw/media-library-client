<template>
  <v-app>
    <v-toolbar app>
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

      <v-toolbar-items v-if="!guestRoute">
        <v-btn
          @click="handleLogout"
          flat
        >
          <v-icon left>exit_to_app</v-icon>
          <span>Logout</span>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <v-container>
        <router-view
          mt5
          pt5
        ></router-view>
      </v-container>
    </v-content>
    <v-footer>
      <v-content>
        <v-layout
          justify-center
          row
        >
          <v-flex
            md4
            xs12
          >
            <div>This product uses the TMDb API but is not endorsed or certified by TMDb.</div>
          </v-flex>
        </v-layout>
      </v-content>
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
        { text: 'Books', route: '/error', icon: 'book' },
        { text: 'Games', route: '/error', icon: 'videogame_asset' },
        { text: 'Music', route: '/error', icon: 'library_music' }
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
