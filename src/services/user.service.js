import axios from 'axios'

export default {
  /* eslint-disable-next-line */
  addUser(user) {
    return axios.post('/api/users', user)
  },
  /* eslint-disable-next-line */
  loginUser(returningUser) {
    return axios.post('/api/user/login', returningUser)
  },
  /* eslint-disable-next-line */
  logoutUser(user) {
    return axios.post('/api/user/logout', user)
  },
  /* eslint-disable-next-line */
  getUser(id, mediaType) {
    return axios.get(`/api/users/${id}/${mediaType}`)
  },
  /* eslint-disable-next-line */
  incrementMovieViewCount(user, movieId) {
    return axios.patch('/api/users/movieUpdate', { user, movieId })
  }
}
