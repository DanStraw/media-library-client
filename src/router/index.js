import Vue from 'vue'
import Router from 'vue-router'
import Movies from '@/components/Movies.vue'
import MoviePage from '@/components/MoviePage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Movies',
      component: Movies
    },
    {
      path: '/movies/:movieID',
      name: 'MoviePage',
      component: MoviePage
    }
  ]
})
