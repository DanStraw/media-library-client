import bookService from '../../services/book.service'
import userService from '../../services/user.service'
import { store } from '../store'

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
    { text: 'Add Reading', value: 'read' },
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
  },
  snackbar: {
    show: false,
    addedBook: null,
    timeout: 2000
  },
  formLoading: false
}

const mutations = {
  /* eslint-disable-next-line */
  'ADD_TO_BOOK_LIBRARY'(state) {
    const newBook = {
      book: state.newBook.title,
      format: state.newBook.format,
      token: localStorage.getItem('mml_jwt')
    }
    state.formLoading = true
    bookService.addBook(newBook).then(res => {
      state.snackbar.itemTitle = res
      state.newBook.title = ''
      state.newBook.format = ''
      state.dialog = false
      state.snackbar.show = true
      state.formLoading = false
    })
      .then(res => {
        this.dispatch('getUser', 'books')
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
    if (state.newBook.title.length < 3) {
      return console.log('query too short')
    }
    /* eslint-disable-next-line */
    bookService.generateDatalist(state.newBook.title).then(res => {
      state.bookFormDetails.datalistItems = []
      let items = []
      res.forEach(resItem => {
        items.push({ title: resItem })
      })
      state.bookFormDetails.showDatalist = true
      state.bookFormDetails.datalistItems = items
    })
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
    let books = store.state.users.user.books
    if (books) {
      books = books.filter(book => {
        return book._id === state.bookID
      })
      return books[0]
    }
  },
  bookSnackbar: state => state.snackbar,
  handleBookLoading: state => state.formLoading
}

export const books = {
  state,
  mutations,
  actions,
  getters
}
