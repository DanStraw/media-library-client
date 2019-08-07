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
  updateCount(user, _item_id, media_type, media_action) {
    return axios.put('/api/user/updateCount', { _user_id: user._id, _item_id, media_type, media_action })
  },
  /* eslint-disable-next-line */
  deleteItem(user, itemId, mediaType) {
    return axios.delete('/api/user/deleteItem', { data: { user, _item_id: itemId, media_type: mediaType } })
  }
}
