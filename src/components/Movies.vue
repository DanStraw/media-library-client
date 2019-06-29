<template>
  <div>
    <div v-if="formShowing">
      <form v-on:submit.prevent="handleMovieSubmit">
        <label for="movie_title"></label>
        <input
          name="movie_title"
          type="text"
        >
        <label for="movie_format"></label>
        <select
          id="movie_format"
          name="movie_format"
        >
          <option
            disabled
            selected
            value
          >-select one-</option>
          <option value="DVD">DVD</option>
          <option value="Blu Ray">Blu-Ray</option>
          <option value="Digital">Digital</option>
        </select>
        <button type="submit">Submit</button>
      </form>
    </div>
    <v-layout>
      <v-flex>
        <div class="movies">
          <table class="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Format</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              <tr
                :key="movie._id"
                class="movie"
                style="fontSize: 2rem"
                v-for="movie in movies"
              >
                <router-link
                  :to="{ name: 'MoviePage', params: {movieID: movie._id }}"
                  class="td-title"
                  tag="td"
                >{{ movie.title }}</router-link>
                <td class="td-format">{{ movie.format }}</td>
                <td class="td-edit">
                  <i class="far fa-edit"></i>
                </td>
                <td class="td-delete">
                  <i
                    @click="handleDelete(movie._id)"
                    class="far fa-trash-alt"
                  ></i>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </v-flex>
    </v-layout>

    <v-layout
      ma5
      row
    >
      <v-flex
        md4
        mt5
        offset-md4
        xs12
      >
        <button @click="toggleForm">{{ toggleFormText }}</button>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import movieService from '../services/movie.service'
export default {
  name: 'Movies',
  /* eslint-disable-next-line */
  data() {
    return {
      movies: [],
      toggleFormText: 'Show Form',
      formShowing: false
    }
  },
  methods: {
    /* eslint-disable-next-line */
    toggleForm() {
      this.toggleFormText === 'Show Form'
        ? (this.toggleFormText = 'Hide Form')
        : (this.toggleFormText = 'Show Form')
      this.formShowing === false
        ? (this.formShowing = true)
        : (this.formShowing = false)
    },
    /* eslint-disable-next-line */
    handleMovieSubmit(e) {
      let title = e.target.elements.movie_title.value
      let format = e.target.elements.movie_format.value
      const movie = {
        title,
        format
      }
      movieService.addMovie(movie).then(res => {
        movieService.getAll().then(movies => this.$set(this, 'movies', movies))
        e.target.elements.movie_title.value = ''
        e.target.elements.movie_format.value = ''
      })
    },
    /* eslint-disable-next-line */
    handleDelete(id) {
      movieService.deleteOne(id).then(res => {
        movieService.getAll().then(movies => this.$set(this, 'movies', movies))
      })
    }
  },
  /* eslint-disable-next-line */
  mounted() {
    movieService.getAll().then(movies => this.$set(this, 'movies', movies))
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style>
table {
  border-collapse: collapse;
}
.movies {
  width: 80%;
  margin: 0 auto;
  padding-top: 100px;
}
tr.movie {
  border-radius: 3px;
  border: 2px solid darkblue;
  color: darkblue;
  text-decoration: none;
  background-color: rgb(211, 211, 211);
}
.td-title,
.td-format,
.td-edit {
  border-right: 2px ridge darkblue;
  padding-left: 5x;
  padding-right: 5px;
}
.td-edit {
  width: 50px;
  text-align: center;
  padding-left: 5px;
}
.td-delete {
  text-align: center;
}
</style>
