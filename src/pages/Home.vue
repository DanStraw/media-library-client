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
                <li>{{mostRecentMovie.title}}</li>
                <li>Viewed: {{mostRecentMovie.updatedAt}}</li>
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
import movieService from '../services/movie.service'
import moment from 'moment'
export default {
  /* eslint-disable-next-line */
  data() {
    return {
      movies: [],
      mostRecentMovie: {}
    }
  },
  methods: {
    /* eslint-disable-next-line */
    getRecentView() {
      let time = 0
      this.movies.forEach(movie => {
        if (movie.updatedAt > time) {
          time = movie.updatedAt
          this.mostRecentMovie = movie
        }
      })
      this.mostRecentMovie.updatedAt = moment(this.mostRecentMovie).format(
        'MM DD YY, h a'
      )
    }
  },
  computed: {
    /* eslint-disable-next-line */
    user() {
      return this.$store.getters.user
    }
  },
  /* eslint-disable-next-line */
  mounted() {
    movieService.getAll().then(movies => {
      this.$set(this, 'movies', movies)
      this.getRecentView()
    })
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
