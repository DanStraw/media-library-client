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
      :newMedia="getNewBook"
      :toggle="getDialog"
      mediaType="Book"
    ></AddForm>
    <v-layout
      justify-center
      row
    >
      <v-flex xs12>
        <collection-table
          :headerInfo="$store.state.books.bookTableHeaders"
          :rowItems="userBooks"
          countType="Read"
          mediaType="Book"
        ></collection-table>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import AddForm from '../components/addForm'
import collectionTable from '../components/collectionTable'

export default {
  name: 'Books',
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
      return this.$store.getters.bookFormDetails
    },
    /* eslint-disable-next-line */
    getDialog() {
      return this.$store.getters.bookDialog
    },
    /* eslint-disable-next-line */
    getNewBook() {
      return this.$store.getters.newBook
    },
    /* eslint-disable-next-line */
    userBooks() {
      return this.$store.getters.userBooks
    },
    /* eslint-disable-next-line */
    snackbar() {
      return this.$store.getters.bookSnackbar
    },
    /* eslint-disable-next-line */
    loading() {
      return this.$store.getters.handleBookLoading
    }
  },
  /* eslint-disable-next-line */
  beforeMount() {
    this.$store.dispatch('getUser', 'books')
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
