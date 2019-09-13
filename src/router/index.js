import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home.vue'
import SignUpPage from '@/pages/SignUpPage'
import LoginPage from '@/pages/LoginPage'
import AlbumsPage from '@/pages/AlbumsPage'
import AlbumPage from '@/pages/AlbumPage'
import BooksPage from '@/pages/BooksPage.vue'
import BookPage from '@/pages/BookPage'
import GamesPage from '@/pages/GamesPage.vue'
import GamePage from '@/pages/GamePage.vue'
import MoviesPage from '@/pages/MoviesPage.vue'
import MoviePage from '@/pages/MoviePage'
import ErrorPage from '@/pages/Error.vue'
import SettingsPage from '@/pages/Settings.vue'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUpPage,
      meta: {
        guest: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginPage,
      meta: {
        guest: true
      }
    },
    {
      path: '/movies',
      name: 'Movies',
      component: MoviesPage,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/movie/:movieID',
      name: 'MoviePage',
      component: MoviePage,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/book/:bookID',
      name: 'BookPage',
      component: BookPage,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/books',
      name: 'BooksPage',
      component: BooksPage,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/albums',
      name: 'AlbumsPage',
      component: AlbumsPage,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/album/:albumID',
      name: 'AlbumPage',
      component: AlbumPage,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/games',
      name: 'GamesPage',
      component: GamesPage,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/game/:gameID',
      name: 'GamePage',
      component: GamePage,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/settings',
      name: 'SettingsPage',
      component: SettingsPage,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/error',
      name: 'ErrorPage',
      component: ErrorPage,
      meta: {
        guest: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('mml_jwt') == null) {
      next({
        path: '/signup',
        params: { nextUrl: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    if (localStorage.getItem('mml_jwt') != null) {
      next({
        path: '/',
        params: { nextUrl: to.fullPath }
      })
    } else {
      next()
    }
  }
})

export default router
