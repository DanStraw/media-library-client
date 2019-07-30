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
          <div>{{ movie.title }}</div>
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
          <div>{{ movie.updatedAt }}</div>
        </v-flex>
        <v-flex
          md6
          xs12
        >
          <div class="caption grey--text">Times Watched</div>
          <div>{{ movie.timesViewed }}</div>
        </v-flex>
        <v-flex
          md6
          xs12
        >
          <div class="caption grey--text">Summary</div>
          <div>{{ details.overview }}</div>
        </v-flex>
        <v-flex
          md8
          xs12
        >
          <div class="caption grey--text">Poster</div>
          <div>
            <img
              :src="`http://image.tmdb.org/t/p/w185${details.poster_path}`"
              alt
            >
          </div>
        </v-flex>
      </v-layout>
    </v-card>
    <v-card
      class="grey lighten-3"
      flat
    >
      <v-layout
        justify-end
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
// import movieService from '../services/movie.service'
// import moment from 'moment'
// const MovieDB = require('moviedb')(process.env.MOVIEDB_API_KEY)
export default {
  /* eslint-disable no-console */
  components: {},
  /* eslint-disable-next-line */
  data() {
    return {
      movie: null,
      details: null
    }
  },
  /* eslint-disable-next-line */
  created() {
    console.log('created:', this.movie)
  },
  /* eslint-disable-next-line */
  beforeMount() {},
  /* eslint-disable-next-line */
  mounted() {
    console.log('mounted:', this.movie)
  },
  /* eslint-disable-next-line */
  beforeCreate() {
    // movieService.findById(this.$route.params.movieID).then(movie => {
    //   this.movie = movie
    //   if (this.movie.timesViewed === 0) {
    //     this.movie.updatedAt = '-'
    //   } else {
    //     this.movie.updatedAt = moment(this.movie.updatedAt).format(
    //       'MMM DD YY, h a'
    //     )
    //   }
    //   MovieDB.movieInfo({ id: movie.movieDBID }, (err, res) => {
    //     if (err) {
    //       return console.log(err)
    //     }
    //     this.details = res
    //   })
    // })
  },
  methods: {}
}
</script>

<style>
.movie-title .is-editing {
  background-color: #ffffff;
  color: #000000;
  padding: 8px;
  display: inline-block;
  min-width: 600px;
}
.add-new-list .is-editing {
  background-color: #ffffff;
  color: #000000;
  padding: 8px;
  margin: 0;
}
</style>

<style scoped lang="scss">
.add-new-list {
  display: inline-block;
  width: 270px;
}
.movie-title {
  color: #000000;
  padding: 10px;
  height: 90px;
}
.movie-page-main {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.movie-format {
  flex-grow: 1;
  margin-bottom: 20px;
  position: relative;
}
.movie-format-inner {
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow-x: scroll;
  position: absolute;
  white-space: nowrap;
}
</style>
