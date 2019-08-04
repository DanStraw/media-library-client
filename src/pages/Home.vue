<template>
  <div class="home">
    <v-container>
      <v-layout
        justify-center
        pb-5
        row
      >
        <v-flex md7>
          <v-card>
            <v-card-title class="display-1">{{ user.username }}&#39;s Media Summary</v-card-title>
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout
        justify-space-around
        row
      >
        <v-flex
          md3
          xs12
        >
          <v-card>
            <v-card-title primary-title>Most Recently Viewed Movie</v-card-title>
            <v-spacer></v-spacer>
            <v-card-text>
              <ul>
                <li>{{recentMovie.itemInfo.title}}</li>
                <li>Viewed: {{recentMovie.updated_at | formatTime(`Do MMM 'YY h:m a`) }}</li>
              </ul>
            </v-card-text>
          </v-card>
        </v-flex>

        <v-flex
          md3
          xs12
        >
          <v-card>
            <v-card-title primary-title>Most Recently Read Book</v-card-title>
            <v-spacer></v-spacer>
            <v-card-text>
              <ul>
                <li>Book Title</li>
                <li>Book Finished: Date and time</li>
              </ul>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  /* eslint-disable-next-line */
  data() {
    return {
      movies: [],
      mostRecentMovie: {}
    }
  },
  methods: {},
  computed: {
    /* eslint-disable-next-line */
    user() {
      return this.$store.getters.user
    },
    /* eslint-disable-next-line */
    recentMovie() {
      return this.$store.getters.recentMovie
    }
  },
  /* eslint-disable-next-line */
  mounted() {
    this.$store.dispatch('getUser', 'all')
  }
}
</script>

<style slot-scoped>
ul {
  list-style: none;
}
.home {
  padding-top: 50px;
}
</style>
