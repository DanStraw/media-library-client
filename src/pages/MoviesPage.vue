<template>
  <div>
    <v-snackbar
      :color="snackbar.color"
      :timeout="snackbar.timeout"
      top
      v-model="snackbar.show"
    >
      <span
        class="text-center"
        v-if="snackbar.itemTitle"
      >
        <span class="font-italic">{{ snackbar.itemTitle }}</span>&nbsp;added to Library
      </span>
      <span
        class="text-center"
        v-if="snackbar.errorMessage"
      >{{ snackbar.errorMessage }}</span>
    </v-snackbar>
    <AddForm
      :formDetails="getFormDetails"
      :newMedia="getNewMovie"
      :toggle="getDialog"
      mediaType="Movie"
    ></AddForm>
    <v-layout
      justify-center
      row
    >
      <v-flex xs12>
        <collection-table
          :headerInfo="$store.state.movies.movieTableHeaders"
          :rowItems="userMovies"
          countType="View"
          mediaType="Movie"
        ></collection-table>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
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
  methods: {},
  /* eslint-disable-next-line */
  computed: {
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
    },
    /* eslint-disable-next-line */
    snackbar() {
      return this.$store.getters.movieSnackbar
    },
    /* eslint-disable-next-line */
    loading() {
      return this.$store.getters.handleMovieLoading
    }
  },
  /* eslint-disable-next-line */
  beforeMount() {
    this.$store.dispatch('getUser', 'movies')
  }
}
</script>

<style scoped>
.v-datatable__actions {
  justify-content: center !important;
}
.text-center {
  width: 100%;
  text-align: center;
}
</style>
