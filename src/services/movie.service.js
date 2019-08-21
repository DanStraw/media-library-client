import axios from 'axios'

export default {
  /* eslint-disable-next-line */
  addMovie(movie) {
    return axios.post('/api/movies', movie).then(res => {
      return res.data
    })
  },
  /* eslint-disable-next-line */
  generateDatalist(title) {
    return axios.post('/api/movies/datalist', { title }).then(res => res.data)
  },
  /* eslint-disable-next-line */
  getAll() {
    return axios.get('/api/movies').then(res => res.data)
  },
  /* eslint-disable-next-line */
  findById(movieId) {
    return axios.get('/api/movies/' + movieId).then(res => res.data)
  }
}
