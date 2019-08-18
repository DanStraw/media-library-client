import Vue from 'vue'
import Vuex from 'vuex'

import { albums } from './modules/albums'
import { movies } from './modules/movies'
import { users } from './modules/users'
import { books } from './modules/books'
import { games } from './modules/games'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    movies,
    users,
    books,
    albums,
    games
  }
})
