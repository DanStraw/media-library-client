<template>
  <div>
    <AddForm
      :formDetails="getFormDetails"
      :newMedia="getNewMovie"
      :toggle="getDialog"
    ></AddForm>
    <v-layout
      justify-center
      row
    >
      <v-flex xs12>
        <collection-table
          :headerInfo="$store.state.movies.movieTableHeaders"
          :rowItems="userMovies"
          countType="view"
        ></collection-table>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import movieService from '../services/movie.service'
import AddForm from '../components/addForm'
import collectionTable from '../components/collectionTable'

export default {
  name: 'Movies',
  /* eslint-disable-next-line */
  data() {
    return {}
  },
  components: {
    AddForm,
    collectionTable
  },
  methods: {
    /* eslint-disable-next-line */
    handleDelete(id) {
      movieService.deleteOne(id).then(res => {
        movieService.getAll().then(movies => {
          this.$set(this, 'movies', movies)
        })
      })
    }
  },
  /* eslint-disable-next-line */
  computed: {
    /* eslint-disable-next-line */
    pagination: {
      /* eslint-disable-next-line */
      get: function() {
        return this.$store.getters.pagination
      },
      /* eslint-disable-next-line */
      set: function(value) {
        this.$store.dispatch('setPagination', value)
      }
    },
    /* eslint-disable-next-line */
    getFormDetails() {
      return this.$store.getters.movieFormDetails
    },
    /* eslint-disable-next-line */
    getDialog() {
      return this.$store.getters.movieDialog
    },
    /* eslint-disable-next-line */
    getNewMovie() {
      return this.$store.getters.newMovie
    },
    /* eslint-disable-next-line */
    userMovies() {
      return this.$store.getters.userMovies
    }
  },
  /* eslint-disable-next-line */
  beforeMount() {
    this.$store.dispatch('getAllMovies')
  }
}
</script>

<style>
table {
  border-collapse: collapse;
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
.v-datatable__actions {
  justify-content: center !important;
}
</style>
