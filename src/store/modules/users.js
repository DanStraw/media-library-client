import userService from '../../services/user.service'
import router from '../../router/index.js'

const state = {
  newUser: {
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirm: ''
  },
  user: {},
  passwordField: {
    icon: 'visibility',
    type: 'password'
  },
  loginError: null,
  signupError: null
}

const mutations = {
  /* eslint-disable-next-line */
  'CREATE_USER'(state) {
    state.signupError = null
    if (state.newUser.password !== state.newUser.passwordConfirm) {
      state.signupError = 'Confirm Password Must Match Password'
      return false
    }
    userService.addUser(state.newUser).then(res => {
      localStorage.setItem('mml_jwt', res.data.token)
      localStorage.setItem('mml_user', JSON.stringify(res.data.user))
      state.user = res.data.user
      for (const key in state.newUser) {
        state.newUser[key] = ''
      }
      return res.data
    }).then(res => {
      router.push('/')
    }).catch(e => {
      state.signupError = 'Account Already Exists for this Email'
    })
  },
  /* eslint-disable-next-line */
  'GET_USER'(state, mediaType) {
    const user = JSON.parse(localStorage.getItem('mml_user'))
    const token = localStorage.getItem('mml_jwt')
    if (!user) {
      return
    }
    userService.getUser(user._id, token, mediaType).then(res => {
      state.user = res.data
      return state.user
    }).catch(e => {
      localStorage.clear()
      router.push('/login')
    })
  },
  /* eslint-disable-next-line */
  'LOGIN_USER'(state) {
    state.loginError = null
    const returningUser = {
      email: state.newUser.email,
      password: state.newUser.password
    }
    userService.loginUser(returningUser).then(res => {
      localStorage.setItem('mml_jwt', res.data.token)
      localStorage.setItem('mml_user', JSON.stringify(res.data.user))
      state.user = res.data.user
      for (const key in state.newUser) {
        state.newUser[key] = ''
      }
      return res.data
    }).then(res => {
      router.push('/')
    }).catch(e => {
      state.loginError = 'Username or Password Incorrect'
    })
  },
  /* eslint-disable-next-line */
  'LOGOUT_USER'(state) {
    const user = {}
    user.user = state.user
    user.token = localStorage.getItem('mml_jwt')
    userService.logoutUser(user).then(res => {
      localStorage.removeItem('mml_jwt')
      localStorage.removeItem('mml_user')
      for (const key in state.user) {
        state.newUser[key] = ''
      }
    }).then(() => {
      router.push('/login')
    }).catch((e) => {
      localStorage.clear()
      router.push('/login')
    })
  },
  /* eslint-disable-next-line */
  'TOGGLE_PASSWORD_VIEW'(state) {
    state.passwordField.type = state.passwordField.type === 'password' ? 'text' : 'password'
    state.passwordField.icon = state.passwordField.icon === 'visibility' ? 'visibility_off' : 'visibility'
  }
}

const actions = {
  /* eslint-disable-next-line */
  handleUserCreate: ({ commit }) => {
    commit('CREATE_USER')
  },
  /* eslint-disable-next-line */
  getUser: ({ commit }, payload) => {
    commit('GET_USER', payload)
  },
  /* eslint-disable-next-line */
  loginUser: ({ commit }) => {
    commit('LOGIN_USER')
  },
  /* eslint-disable-next-line */
  logoutUser: ({ commit }) => {
    commit('LOGOUT_USER')
  },
  togglePasswordVisibility: ({ commit }) => {
    commit('TOGGLE_PASSWORD_VIEW')
  }
}

const getters = {
  newUser: state => state.newUser,
  user: state => state.user,
  signupErrorMessage: state => state.signupError,
  loginErrorMessage: state => state.loginError,
  userMovies: state => state.user.movies,
  userBooks: state => state.user.books,
  userAlbums: state => state.user.albums,
  userGames: state => state.user.games,
  passwordFieldSettings: state => state.passwordField,
  recentMovie: state => {
    let time = 0
    let recentMovie = {}
    if (state.user.movies.length !== 0) {
      state.user.movies.forEach(movie => {
        if (movie.updated_at > time && movie.viewCount > 0) {
          time = movie.updated_at
          recentMovie = movie
        }
      })
      return recentMovie
    }
    return null
  },
  recentBook: state => {
    let time = 0
    let recentBook = {}
    if (state.user.books.length !== 0) {
      state.user.books.forEach(book => {
        if (book.updated_at > time && book.readCount > 0) {
          time = book.updated_at
          recentBook = book
        }
      })
      return recentBook
    }
    return null
  },
  recentAlbum: state => {
    let time = 0
    let recentAlbum = {}
    if (state.user.albums.length !== 0) {
      state.user.albums.forEach(album => {
        if (album.updated_at > time && album.listenCount > 0) {
          time = album.updated_at
          recentAlbum = album
        }
      })
      if (recentAlbum.itemInfo) {
        return recentAlbum
      }
      return null
    }
  },
  recentGame: state => {
    let time = 0
    let recentGame = {}
    if (state.user.games.length !== 0) {
      state.user.games.forEach(game => {
        if (game.updated_at > time && game.playCount > 0) {
          time = game.updated_at
          recentGame = game
        }
      })
      return recentGame
    }
    return null
  }
}
export const users = {
  state,
  mutations,
  actions,
  getters
}
