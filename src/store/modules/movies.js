import movieService from '../../services/movie.service'
import userService from '../../services/user.service'
import { store } from '../store'

const state = {
  newMovie: {
    title: '',
    format: ''
  },
  movieTableHeaders: [
    { text: 'Title', value: 'title' },
    { text: 'Format', value: 'format' },
    { text: 'Last Watched', value: 'date_updated' },
    { text: 'Total Viewings', value: 'times_viewed' },
    { text: 'Add Viewing', value: 'view' },
    { text: 'Delete', value: 'delete' }
  ],
  movieDialog: false,
  movieFormDetails: {
    header: 'Movie',
    inputs: [
      {
        label: 'Title',
        type: 'input',
        value: 'title'
      },
      {
        label: 'Format',
        options: ['Blu Ray', 'Digital', 'DVD'],
        type: 'select',
        value: 'format'
      }
    ],
    submitAction: 'handleMovieSubmit',
    datalistAction: 'handleMovieDatalist',
    datalistItems: [],
    showDatalist: false,
    movieID: null
  },
  snackbar: {
    show: false,
    itemTitle: null,
    timeout: 2000,
    errorMessage: '',
    color: 'success'
  },
  formLoading: false
}

const mutations = {
  /* eslint-disable-next-line */
  'ADD_TO_MOVIE_LIBRARY'(state) {
    const newMovie = {
      movie: state.newMovie.title,
      format: state.newMovie.format,
      token: localStorage.getItem('mml_jwt')
    }
    state.formLoading = true
    movieService.addMovie(newMovie).then(res => {
      state.snackbar.itemTitle = res
      state.newMovie.title = ''
      state.newMovie.format = ''
      state.dialog = false
      state.snackbar.show = true
      state.formLoading = false
      state.snackbar.errorMessage = ''
      state.snackbar.color = 'success'
      state.movieFormDetails.datalistItems = []
    })
      .then(res => {
        this.dispatch('getUser', 'movies')
      }).catch((e) => {
        state.formLoading = false
        state.newMovie.title = ''
        state.newMovie.format = ''
        state.snackbar.errorMessage = 'Item Could Not Be Added'
        state.snackbar.show = true
        state.snackbar.itemTitle = ''
        state.dialog = false
        state.snackbar.color = 'error'
        state.movieFormDetails.datalistItems = []
      })
  },
  /* eslint-disable-next-line */
  'MOVIE_DATALIST'(state) {
    if (state.newMovie.title.length < 3) {
      return console.log('query too short')
    }
    /* eslint-disable-next-line */
    movieService.generateDatalist(state.newMovie.title).then(res => {
      state.movieFormDetails.datalistItems = []
      let items = []
      res.forEach(resItem => {
        items.push({ title: resItem.title })
      })
      state.movieFormDetails.showDatalist = true
      state.movieFormDetails.datalistItems = items
    })
  },
  /* eslint-disable-next-line */
  'INCREMENT_VIEW_COUNT'(state, movieId) {
    const user = JSON.parse(localStorage.getItem('mml_user'))
    const mediaType = 'movies'
    const mediaAction = 'view'
    userService.updateCount(user, movieId, mediaType, mediaAction).then(res => {
      this.dispatch('getUser', 'movies')
    })
  },
  /* eslint-disable-next-line */
  'DELETE_MOVIE'(state, movieId) {
    const user = this.state.users.user
    const mediaType = 'movies'
    userService.deleteItem(user, movieId, mediaType).then(res => {
      this.dispatch('getUser', 'movies')
    })
  },
  /* eslint-disable-next-line */
  'SET_MOVIE_ID'(state, movieID) {
    state.movieID = movieID
  }
}

const actions = {
  handleMovieSubmit: ({ commit }) => {
    commit('ADD_TO_MOVIE_LIBRARY')
  },
  handleMovieDatalist: ({ commit }) => {
    commit('MOVIE_DATALIST')
  },
  incrementViewCount: ({ commit }, movieId) => {
    commit('INCREMENT_VIEW_COUNT', movieId)
  },
  deleteMovie: ({ commit }, movieId) => {
    commit('DELETE_MOVIE', movieId)
  },
  setMovieID: ({ commit }, movieID) => {
    commit('SET_MOVIE_ID', movieID)
  }
}

const getters = {
  movieFormDetails: state => state.movieFormDetails,
  newMovie: state => state.newMovie,
  movieDialog: state => state.movieDialog,
  movie: state => {
    let movies = store.state.users.user.movies
    if (movies) {
      movies = movies.filter(movie => {
        return movie._id === state.movieID
      })
      return movies[0]
    }
  },
  movieSnackbar: state => state.snackbar,
  handleMovieLoading: state => state.formLoading
}

export const movies = {
  state,
  mutations,
  actions,
  getters
}
