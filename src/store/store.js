import Vue from 'vue'
import Vuex from 'vuex'

import { movies } from './modules/movies'
import { users } from './modules/users'
import { books } from './modules/books'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    movies,
    users,
    books
  }
})
