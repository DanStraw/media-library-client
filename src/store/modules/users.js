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
  user: {}
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
  'GET_USER'(state) {
    const user = JSON.parse(localStorage.getItem('mml_user'))
    userService.getUser(user._id).then(res => {
      state.user = res.data
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
  'INCREMENT_VIEW_COUNT'(state, value) {
    userService.incrementMovieViewCount(JSON.parse(localStorage.getItem('mml_user')), value).then(res => {
      state.user = res.data
    })
  }
}

const actions = {
  /* eslint-disable-next-line */
  handleUserCreate: ({ commit }) => {
    commit('CREATE_USER')
  },
  /* eslint-disable-next-line */
  getUser: ({ commit }) => {
    commit('GET_USER')
  },
  /* eslint-disable-next-line */
  loginUser: ({ commit }) => {
    commit('LOGIN_USER')
  },
  /* eslint-disable-next-line */
  logoutUser: ({ commit }) => {
    commit('LOGOUT_USER')
  },
  incrementViewCount: ({ commit }, payload) => {
    commit('INCREMENT_VIEW_COUNT', payload)
  }
}

const getters = {
  newUser: state => state.newUser,
  user: state => state.user,
  userMovies: state => state.user.movies
}
export const users = {
  state,
  mutations,
  actions,
  getters
}