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
  }
}

const mutations = {
  /* eslint-disable-next-line */
  'CREATE_USER'(state) {
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
    })
  },
  /* eslint-disable-next-line */
  'GET_USER'(state, mediaType) {
    const user = JSON.parse(localStorage.getItem('mml_user'))
    if (!user) {
      return
    }
    userService.getUser(user._id, mediaType).then(res => {
      state.user = res.data
      return state.user
    })
  },
  /* eslint-disable-next-line */
  'LOGIN_USER'(state) {
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
  userMovies: state => state.user.movies,
  userBooks: state => state.user.books,
  userAlbums: state => state.user.albums,
  userGames: state => state.user.games,
  passwordFieldSettings: state => state.passwordField,
  recentMovie: state => {
    let time = 0
    let recentMovie = {}
    if (state.user.movies) {
      state.user.movies.forEach(movie => {
        if (movie.updated_at > time) {
          time = movie.updated_at
          recentMovie = movie
        }
      })
    }
    return recentMovie
  }
}
export const users = {
  state,
  mutations,
  actions,
  getters
}
