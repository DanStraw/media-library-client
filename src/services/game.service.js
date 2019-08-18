import axios from 'axios'

export default {
  /* eslint-disable-next-line */
  addGame(newGame) {
    return axios.post('/api/games', newGame).then(res => res.data)
  },
  /* eslint-disable-next-line */
  generateDatalist(title) {
    return axios.post('/api/games/datalist', { title }).then(res => res.data)
  }
}
