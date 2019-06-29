import axios from 'axios'

export default {
  addMovie (movie) {
    return axios.post('/api/movies', movie).then(res => {
      return res.data
    })
  },
  getAll () {
    return axios.get('/api/movies').then(res => res.data)
  },
  findById (movieId) {
    return axios.get('/api/movies/' + movieId).then(res => res.data)
  },
  deleteOne (id) {
    return axios.delete('/api/movies/' + id).then(res => {
      return res.data
    })
  }
}
