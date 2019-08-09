import axios from 'axios'

export default {
  /* eslint-disable-next-line */
  addAlbum(newAlbum) {
    console.log('axios add album')
    return axios.post('/api/albums', newAlbum).then(res => res.data)
  },
  /* eslint-disable-next-line */
  generateDatalist(title) {
    return axios.post('/api/albums/datalist', { title }).then(res => res.data)
  }
}
