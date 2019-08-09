<template>
  <div>
    <AddForm
      :formDetails="getFormDetails"
      :newMedia="getNewAlbum"
      :toggle="getDialog"
      mediaType="Album"
    ></AddForm>
    <v-layout
      justify-center
      row
    >
      <v-flex xs12>
        <collection-table
          :headerInfo="$store.state.albums.albumTableHeaders"
          :rowItems="userAlbums"
          countType="Listen"
          mediaType="Album"
        ></collection-table>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import AddForm from '../components/addForm'
import collectionTable from '../components/collectionTable'

export default {
  name: 'Albums',
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
      return this.$store.getters.albumFormDetails
    },
    /* eslint-disable-next-line */
    getDialog() {
      return this.$store.getters.albumDialog
    },
    /* eslint-disable-next-line */
    getNewAlbum() {
      return this.$store.getters.newAlbum
    },
    /* eslint-disable-next-line */
    userAlbums() {
      return this.$store.getters.userAlbums
    }
  },
  /* eslint-disable-next-line */
  beforeMount() {
    this.$store.dispatch('getUser', 'albums')
  }
}
</script>

<style scoped>
.v-datatable__actions {
  justify-content: center !important;
}
</style>
