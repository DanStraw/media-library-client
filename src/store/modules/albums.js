import albumService from '../../services/album.service'
import userService from '../../services/user.service'
import { store } from '../store'

const state = {
  newAlbum: {
    title: '',
    format: ''
  },
  albumTableHeaders: [
    { text: 'Album Title', value: 'title' },
    { text: 'Format', value: 'format' },
    { text: 'Last Listen', value: 'date_updated' },
    { text: 'Total Listens', value: 'listened' },
    { text: 'Add to Listens', value: 'listen' },
    { text: 'Delete', value: 'delete' }
  ],
  albumDialog: false,
  albumFormDetails: {
    header: 'Album',
    inputs: [
      {
        label: 'Album Title',
        type: 'input',
        value: 'title'
      },
      {
        label: 'Format',
        options: ['CD', 'Digital', 'Cassette', 'Vinyl'],
        type: 'select',
        value: 'format'
      }
    ],
    submitAction: 'handleAlbumSubmit',
    datalistAction: 'handleAlbumDatalist',
    datalistItems: [],
    showDatalist: false,
    albumID: null
  },
  snackbar: {
    show: false,
    itemTitle: null,
    timeout: 2000
  },
  formLoading: false
}

const mutations = {
  /* eslint-disable-next-line */
  'ADD_TO_ALBUM_LIBRARY'(state) {
    const newAlbum = {
      album: state.newAlbum.title,
      format: state.newAlbum.format,
      token: localStorage.getItem('mml_jwt')
    }
    state.formLoading = true
    albumService.addAlbum(newAlbum).then(res => {
      state.snackbar.itemTitle = res
      state.newAlbum.title = ''
      state.newAlbum.format = ''
      state.dialog = false
      state.snackbar.show = true
      state.formLoading = false
    })
      .then(res => {
        this.dispatch('getUser', 'albums')
      })
  },
  /* eslint-disable-next-line */
  'INCREMENT_LISTEN_COUNT'(state, albumId) {
    const user = JSON.parse(localStorage.getItem('mml_user'))
    const mediaType = 'albums'
    const mediaAction = 'listen'
    userService.updateCount(user, albumId, mediaType, mediaAction).then(res => {
      this.dispatch('getUser', 'albums')
    })
  },
  /* eslint-disable-next-line */
  'ALBUM_DATALIST'(state) {
    if (state.newAlbum.title.length < 3) {
      return console.log('query too short')
    }
    albumService.generateDatalist(state.newAlbum.title).then(res => {
      state.albumFormDetails.showDatalist = false
      state.albumFormDetails.datalistItems = []
      let items = []
      res.forEach(resItem => {
        items.push({ title: resItem })
      })
      state.albumFormDetails.showDatalist = true
      state.albumFormDetails.datalistItems = items
    })
  },
  /* eslint-disable-next-line */
  'DELETE_ALBUM'(state, albumId) {
    const user = this.state.users.user
    const mediaType = 'albums'
    userService.deleteItem(user, albumId, mediaType).then(res => {
      this.dispatch('getUser', 'albums')
    })
  },
  /* eslint-disable-next-line */
  'SET_ALBUM_ID'(state, albumID) {
    state.albumID = albumID
  }
}

const actions = {
  handleAlbumSubmit: ({ commit }) => {
    commit('ADD_TO_ALBUM_LIBRARY')
  },
  handleAlbumDatalist: ({ commit }) => {
    commit('ALBUM_DATALIST')
  },
  incrementListenCount: ({ commit }, albumId) => {
    commit('INCREMENT_LISTEN_COUNT', albumId)
  },
  deleteAlbum: ({ commit }, albumId) => {
    commit('DELETE_ALBUM', albumId)
  },
  setAlbumID: ({ commit }, albumID) => {
    commit('SET_ALBUM_ID', albumID)
  }
}

const getters = {
  albumFormDetails: state => state.albumFormDetails,
  newAlbum: state => state.newAlbum,
  albumDialog: state => state.AlbumDialog,
  album: (state) => {
    let albums = store.state.users.user.albums
    if (albums) {
      albums = albums.filter(album => {
        return album._id === state.albumID
      })
      return albums[0]
    }
  },
  albumSnackbar: state => state.snackbar,
  handleAlbumLoading: state => state.formLoading
}

export const albums = {
  state,
  mutations,
  actions,
  getters
}
