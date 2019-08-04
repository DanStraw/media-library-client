import booksService from '../../services/books.service'

const booksdb = require('google-books-search')
var options = {
  key: process.env.GOOGLE_BOOKS_API_KEY
}

const state = {
  newBook: {
    title: '',
    format: ''
  },
  bookTableHeaders: [
    { text: 'Title', value: 'title' },
    { text: 'Format', value: 'format' },
    { text: 'Last Read', value: 'date_updated' },
    { text: 'Total Times Read', value: 'read' },
    { text: 'Add REading', value: 'read' },
    { text: 'Delete', value: 'delete' }
  ],
  bookDialog: false,
  bookFormDetails: {
    header: 'Book',
    inputs: [
      {
        label: 'Title',
        type: 'input',
        value: 'title'
      },
      {
        label: 'Format',
        options: ['Hardcover', 'Paperback', 'Digital', 'Audio'],
        type: 'select',
        value: 'format'
      }
    ],
    submitAction: 'handleBookSubmit',
    datalistAction: 'handleBookDatalist',
    datalistItems: [],
    showDatalist: false
  }
}

const mutations = {
  /* eslint-disable-next-line */
  'ADD_TO_BOOK_LIBRARY'(state) {
    booksdb.search(state.newBook.title, options, (err, res) => {
      if (err) {
        return console.log(err)
      }
      if (!res) {
        return alert('Book not Found')
      }
      const newBook = {
        book: res[0],
        format: state.newBook.format,
        token: localStorage.getItem('mml_jwt')
      }
      booksService.addBook(newBook).then(res => {
        state.newBook.title = ''
        state.newBook.format = ''
        state.dialog = false
      })
        .then(res => {
          this.dispatch('getUser', 'books')
        })
    })
  },
  /* eslint-disable-next-line */
  'BOOK_DATALIST'(state) {
    state.bookFormDetails.datalistItems = []
    if (state.newBook.title.length < 3) {
      return console.log('query too short')
    }
    /* eslint-disable-next-line */
    booksdb.search(state.newBook.title, options, (err, res) => {
      if (err) {
        return console.log(err)
      }
      if (res.length < 5) {
        for (let i = 0; i < res.length; i++) {
          state.bookFormDetails.datalistItems.push(res[i])
        }
      } else {
        for (let i = 0; i < 5; i++) {
          state.bookFormDetails.datalistItems.push(res[i])
        }
      }
      state.bookFormDetails.showDatalist = true
      state.bookFormDetails.datalistItems.filter((book, i) => {
        return i <= 4
      })
    })
  },
  /* eslint-disable-next-line */
  'HIDE_BOOK_DATALIST'(state) {
    state.bookFormDetails.showDatalist = false
  }
}

const actions = {
  /* eslint-disable-next-line */
  handleBookSubmit: ({ commit }) => {
    commit('ADD_TO_BOOK_LIBRARY')
  },
  /* eslint-disable-next-line */
  handleBookDatalist: ({ commit }) => {
    commit('BOOK_DATALIST')
  },
  /* eslint-disable-next-line */
  hideBookDatalist: ({ commit }) => {
    commit('HIDE_BOOK_DATALIST')
  }
}

const getters = {
  bookFormDetails: state => state.bookFormDetails,
  newBook: state => state.newBook,
  bookDialog: state => state.bookDialog
}

export const books = {
  state,
  mutations,
  actions,
  getters
}
