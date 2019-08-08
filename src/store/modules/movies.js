import movieService from '../../services/movie.service'
import userService from '../../services/user.service'
import { store } from '../store'

const MovieDB = require('moviedb')(process.env.MOVIEDB_API_KEY)

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
  }
}

const mutations = {
  /* eslint-disable-next-line */
  'ADD_TO_MOVIE_LIBRARY'(state) {
    MovieDB.searchMovie({ query: state.newMovie.title }, (err, res) => {
      if (err) {
        return console.log(err)
      }
      if (!res.results) {
        return alert('Movie not Found')
      }
      const newMovie = {
        movie: res.results[0],
        format: state.newMovie.format,
        token: localStorage.getItem('mml_jwt')
      }
      movieService.addMovie(newMovie).then(res => {
        state.newMovie.title = ''
        state.newMovie.format = ''
      }).then(res => {
        state.dialog = false
      }).then(res => {
        this.dispatch('getUser', 'movies')
      })
    })
  },
  /* eslint-disable-next-line */
  'MOVIE_DATALIST'(state) {
    state.movieFormDetails.datalistItems = []
    if (state.newMovie.title.length < 3) {
      return console.log('query too short')
    }
    /* eslint-disable-next-line */
    MovieDB.searchMovie({ query: state.newMovie.title }, (err, res) => {
      if (err) {
        return console.log(err)
      }
      if (res.results.length < 5) {
        for (let i = 0; i < res.results.length; i++) {
          state.movieFormDetails.datalistItems.push(res.results[i])
        }
      } else {
        for (let i = 0; i < 5; i++) {
          state.movieFormDetails.datalistItems.push(res.results[i])
        }
      }
      state.movieFormDetails.showDatalist = true
    })
  },
  /* eslint-disable-next-line */
  'HIDE_MOVIE_DATALIST'(state) {
    state.movieFormDetails.showDatalist = false
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
  hideMovieDatalist: ({ commit }) => {
    commit('HIDE_MOVIE_DATALIST')
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
  }
}

export const movies = {
  state,
  mutations,
  actions,
  getters
}
