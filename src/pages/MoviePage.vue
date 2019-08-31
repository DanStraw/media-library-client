<template>
  <div class="movie-page-main">
    <v-card
      class="pa-3"
      flat
      v-if="movie"
    >
      <v-layout
        row
        wrap
      >
        <v-flex
          md6
          xs12
        >
          <div class="caption grey--text">Title</div>
          <div>{{ movie.itemInfo.title }}</div>
        </v-flex>
        <v-flex
          md6
          xs12
        >
          <div class="caption grey--text">Format</div>
          <div>{{ movie.format }}</div>
        </v-flex>
        <v-flex
          md6
          xs12
        >
          <div class="caption grey--text">Last Watched</div>
          <div>{{ movie.updated_at | formatTime(`MMM Do 'YY`)}}</div>
        </v-flex>
        <v-flex
          md6
          xs12
        >
          <div class="caption grey--text">Times Watched</div>
          <div>{{ movie.viewCount }}</div>
        </v-flex>
        <v-flex
          md6
          xs12
        >
          <div class="caption grey--text">Summary</div>
          <div>{{ movie.itemInfo.summary }}</div>
        </v-flex>
        <v-flex
          md8
          xs12
        >
          <div class="caption grey--text">Poster</div>
          <div>
            <img
              :src="`http://image.tmdb.org/t/p/w185${movie.itemInfo.image}`"
              alt
            />
          </div>
        </v-flex>
      </v-layout>
    </v-card>
    <v-card
      class="grey lighten-3"
      flat
    >
      <v-layout
        justify-center
        row
      >
        <v-flex
          md2
          xs12
        >
          <v-btn
            color="cyan darken-4"
            flat
            to="/movies/"
          >
            <v-icon>arrow_back</v-icon>Return to Movies
          </v-btn>
        </v-flex>
      </v-layout>
    </v-card>
  </div>
</template>

<script>
export default {
  components: {},
  /* eslint-disable-next-line */
  beforeCreate() {},
  /* eslint-disable-next-line */
  beforeMount() {
    this.$store.dispatch('getUser', 'movies')
    this.$store.dispatch('setMovieID', this.$route.params.movieID)
  },
  /* eslint-disable-next-line */
  mounted() {},
  methods: {},
  computed: {
    /* eslint-disable-next-line */
    movie() {
      return this.$store.getters.movie
    }
  }
}
</script>

<style>
</style>
