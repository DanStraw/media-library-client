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
</style>
