import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home.vue'
import MoviesPage from '@/pages/MoviesPage.vue'
import BooksPage from '@/pages/BooksPage.vue'
import MoviePage from '@/pages/MoviePage'
import ErrorPage from '@/pages/Error.vue'
import SignUpPage from '@/pages/SignUpPage'
import LoginPage from '@/pages/LoginPage'

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
      path: '/movies/:movieID',
      name: 'MoviePage',
      component: MoviePage,
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
      path: '/error',
      name: 'ErrorPage',
      component: ErrorPage,
      meta: {
        requiresAuth: true
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
