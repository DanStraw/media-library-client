import axios from 'axios'

export default {
  /* eslint-disable-next-line */
  addBook(book) {
    console.log('adding book')
    return axios.post('/api/books', book).then(res => {
      return res.data
    })
  },
  /* eslint-disable-next-line */
  getAll() {
    return axios.get('/api/books').then(res => res.data)
  },
  /* eslint-disable-next-line */
  findById(bookId) {
    return axios.get('/api/books/' + bookId).then(res => res.data)
  },
  /* eslint-disable-next-line */
  incrementViews(id) {
    return axios.put('/api/books/' + id).then(res => {
      return res.data
    })
  },
  /* eslint-disable-next-line */
  deleteOne(id) {
    return axios.delete('/api/books/' + id).then(res => {
      return res.data
    })
  }
}
