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
    return axios.get(`/api/user/${id}/${mediaType}`)
  },
  /* eslint-disable-next-line */
  incrementMovieViewCount(user, movieId) {
    return axios.put('/api/user/movieUpdate', { user, movieId })
  },
  /* eslint-disable-next-line */
  updateCount(user, itemId, mediaType, mediaAction) {
    return axios.put('/api/user/updateCount', { _user_id: user._id, _item_id: itemId, media_type: mediaType, media_action: mediaAction })
  },
  /* eslint-disable-next-line */
  deleteUserMovie(token, movieId) {
    return axios.delete('/api/user/movieDelete', { data: { token, movieId } })
  },
  /* eslint-disable-next-line */
  deleteItem(user, itemId, mediaType) {
    console.log('axios deleteItem')
    return axios.delete('/api/user/deleteItem', { data: { user, _item_id: itemId, media_type: mediaType } })
  }
}
