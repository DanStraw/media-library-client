<template>
  <div class="movie-page-main">
    <div>
      <button @click="tggleForm">{{ formButton }}</button>
    </div>
    <template v-if="movie">
      <div class="movie-title">
        <h2>{{ movie.title }}</h2>
      </div>
      <div class="movie-format">
        <div class="movie-format-inner">{{ movie.format }}</div>
      </div>
    </template>
  </div>
</template>

<script>
import movieService from '../services/movie.service'
export default {
  /* eslint-disable no-console */
  components: {},
  /* eslint-disable-next-line */
  data() {
    return {
      movie: null
    }
  },
  /* eslint-disable-next-line */
  created() {},
  /* eslint-disable-next-line */
  mounted() {
    movieService.findById(this.$route.params.movieID).then(movie => {
      this.$set(this, 'movie', movie)
    })
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
  color: #ffffff;
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
