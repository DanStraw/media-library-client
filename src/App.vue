<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>My Media</span>
        <span class="font-weight-light">Library</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn flat>
        <span class="mr-2">Movies</span>
      </v-btn>
      <v-btn flat>
        <span class="mr-2">Books</span>
      </v-btn>
      <v-btn flat>
        <span class="mr-2">Games</span>
      </v-btn>
      <v-btn flat>
        <span class="mr-2">Music</span>
      </v-btn>
      <v-btn flat>
        <span class="mr-2">Sign Out</span>
      </v-btn>
    </v-toolbar>
    <main>
      <v-container fluid>
        <router-view
          mt5
          pt5
        ></router-view>
      </v-container>
    </main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  /* eslint-disable-next-line */
  data() {
    return {
      //
    }
  }
}
</script>



