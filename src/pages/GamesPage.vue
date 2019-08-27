<template>
  <div>
    <v-snackbar
      :timeout="snackbar.timeout"
      color="success"
      top
      v-model="snackbar.show"
    >
      <div>
        <span class="font-italic">{{ snackbar.itemTitle }}</span>
        &nbsp;added to Library
      </div>
    </v-snackbar>
    <AddForm
      :formDetails="getFormDetails"
      :newMedia="getNewGame"
      :toggle="getDialog"
      mediaType="Game"
    ></AddForm>
    <v-layout
      justify-center
      row
    >
      <v-flex xs12>
        <collection-table
          :headerInfo="$store.state.games.gameTableHeaders"
          :rowItems="userGames"
          countType="Play"
          mediaType="Game"
        ></collection-table>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import AddForm from '../components/addForm'
import collectionTable from '../components/collectionTable'

export default {
  name: 'Games',
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
      return this.$store.getters.gameFormDetails
    },
    /* eslint-disable-next-line */
    getDialog() {
      return this.$store.getters.gameDialog
    },
    /* eslint-disable-next-line */
    getNewGame() {
      return this.$store.getters.newGame
    },
    /* eslint-disable-next-line */
    userGames() {
      return this.$store.getters.userGames
    },
    /* eslint-disable-next-line */
    snackbar() {
      return this.$store.getters.gameSnackbar
    }
  },
  /* eslint-disable-next-line */
  beforeMount() {
    this.$store.dispatch('getUser', 'games')
  }
}
</script>

<style scoped>
.v-datatable__actions {
  justify-content: center !important;
}
</style>
