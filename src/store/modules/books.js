import booksService from '../../services/books.service'
import userService from '../../services/user.service'
import { store } from '../store'

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
    showDatalist: false,
    bookID: null
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
  'INCREMENT_READ_COUNT'(state, bookId) {
    const user = JSON.parse(localStorage.getItem('mml_user'))
    const mediaType = 'books'
    const mediaAction = 'read'
    userService.updateCount(user, bookId, mediaType, mediaAction).then(res => {
      this.dispatch('getUser', 'books')
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
  },
  /* eslint-disable-next-line */
  'DELETE_BOOK'(state, bookId) {
    const user = this.state.users.user
    const mediaType = 'books'
    userService.deleteItem(user, bookId, mediaType).then(res => {
      this.dispatch('getUser', 'books')
    })
  },
  /* eslint-disable-next-line */
  'SET_BOOK_ID'(state, bookID) {
    state.bookID = bookID
  }
}

const actions = {
  handleBookSubmit: ({ commit }) => {
    commit('ADD_TO_BOOK_LIBRARY')
  },
  handleBookDatalist: ({ commit }) => {
    commit('BOOK_DATALIST')
  },
  incrementReadCount: ({ commit }, bookId) => {
    commit('INCREMENT_READ_COUNT', bookId)
  },
  hideBookDatalist: ({ commit }) => {
    commit('HIDE_BOOK_DATALIST')
  },
  deleteBook: ({ commit }, bookId) => {
    commit('DELETE_BOOK', bookId)
  },
  setBookID: ({ commit }, bookID) => {
    commit('SET_BOOK_ID', bookID)
  }
}

const getters = {
  bookFormDetails: state => state.bookFormDetails,
  newBook: state => state.newBook,
  bookDialog: state => state.bookDialog,
  book: (state) => {
    console.log(store.state.users.user)
    let books = store.state.users.user.books
    console.log('books:', books)
    if (books) {
      books = books.filter(book => {
        return book._id === state.bookID
      })
      return books[0]
    }
  }
}

export const books = {
  state,
  mutations,
  actions,
  getters
}
