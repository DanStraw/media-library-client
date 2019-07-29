import movieService from '../../services/movie.service'

const MovieDB = require('moviedb')(process.env.MOVIEDB_API_KEY)

const state = {
  newMovie: {
    title: '',
    format: ''
  },
  movies: [],
  movieTableHeaders: [
    { text: 'Title', value: 'title' },
    { text: 'Format', value: 'format' },
    { text: 'Last Watched', value: 'date_updated' },
    { text: 'Total Viewings', value: 'times_viewed' },
    { text: 'Add Viewing', value: 'view' },
    { text: 'Delete', value: 'delete' }
  ],
  pagination: {
    descending: false,
    page: 1,
    rowsPerPage: 5,
    sortBy: 'title',
    totalItems: 0,
    rowsPerPageItems: [5, 10, 20]
  },
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
    autoCompleteAction: 'handleMovieAutoComplete',
    autoCompleteSuggestions: []
  }
}

const mutations = {
  /* eslint-disable-next-line */
  'ADD_TO_LIBRARY'(state) {
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
        movieService.getAll().then(movies => {
          state.newMovie.title = ''
          state.newMovie.format = ''
          state.movies = movies
        }).then(res => {
          state.dialog = false
        }).then(res => {
          this.dispatch('getUser')
        })
      })
    })
  },
  /* eslint-disable-next-line */
  'GET_ALL_MOVIES'(state) {
    movieService.getAll().then(movies => {
      state.movies = movies
    })
  },
  /* eslint-disable-next-line */
  'SET_PAGINATION'(state, value) {
    state.pagination = value
  },
  /* eslint-disable-next-line */
  'MOVIE_AUTOCOMPLETE'(state) {
    state.movieFormDetails.autoCompleteSuggestions = []
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
          state.movieFormDetails.autoCompleteSuggestions.push(res.results[i])
        }
      } else {
        for (let i = 0; i < 5; i++) {
          state.movieFormDetails.autoCompleteSuggestions.push(res.results[i])
        }
      }
      this.showDatalist = true
    })
  }
}

const actions = {
  /* eslint-disable-next-line */
  handleMovieSubmit: ({ dispatch, commit }) => {
    commit('ADD_TO_LIBRARY')
  },
  /* eslint-disable-next-line */
  getAllMovies: ({ commit }) => {
    commit('GET_ALL_MOVIES')
  },
  /* eslint-disable-next-line */
  handleMovieAutoComplete: ({ commit }, payload) => {
    commit('MOVIE_AUTOCOMPLETE', payload)
  }
}

const getters = {
  movieFormDetails: state => state.movieFormDetails,
  newMovie: state => state.newMovie,
  movieDialog: state => state.movieDialog
}

export const movies = {
  state,
  mutations,
  actions,
  getters
}
