import axios from 'axios'

export default {
  /* eslint-disable-next-line */
  addUser(user) {
    return axios.post('/api/users', user)
      .then(function (response) {
        return response
      }).catch(function (error) {
        return error
      })
  },
  /* eslint-disable-next-line */
  loginUser(returningUser) {
    return axios.post('/api/user/login', returningUser)
      .then(function (response) {
        return response
      })
      .catch(function (error) {
        return error
      })
  },
  /* eslint-disable-next-line */
  logoutUser(user) {
    return axios.post('/api/user/logout', user)
  },
  /* eslint-disable-next-line */
  getUser(id, token, mediaType) {
    return axios.get(`/api/user/${id}/${mediaType}/${token}`)
  },
  /* eslint-disable-next-line */
  updateCount(user, _item_id, media_type, media_action) {
    return axios.put('/api/user/updateCount', { _user_id: user._id, _item_id, media_type, media_action })
  },
  /* eslint-disable-next-line */
  deleteItem(user, itemId, mediaType) {
    return axios.delete('/api/user/deleteItem', { data: { user, _item_id: itemId, media_type: mediaType } })
  },
  /* eslint-disable-next-line */
  checkOldPassword(user, token, oldPassword) {
    return axios.put('/api/user/oldPassword', { user, token, oldPassword })
      .then(res => res)
      .catch(e => e.response)
  },
  /* eslint-disable-next-line */
  updatePassword(info) {
    return axios.put('/api/user/updatePassword', { ...info })
      .then(res => res)
      .catch(e => e.response)
  },
  /* eslint-disable-next-line */
  updateColor(info) {
    return axios.put('/api/user/color', { ...info })
      .then(res => {
        return res
      })
      .catch(e => {
        return e.response
      })
  },
  /* eslint-disable-next-line */
  deleteUser(info) {
    return axios.delete(`/api/user/${info.user._id}/${info.token}`)
      .then(res => res)
      .catch(e => e.response)
  }
}
