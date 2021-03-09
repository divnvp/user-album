import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/table/TableUsersData'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    query: {
      page: '',
      size: '',
    }
  },
  {
    path: `/:userId/albums`,
    name: 'Albums',
    component: () => import('../components/albums/UserAlbum.vue'),
    query: {
      page: '',
      size: '',
    }
  },
  {
    path: `/albums/:albumId`,
    name: 'Photos',
    component: () => import('../components/photos/AlbumPhoto.vue'),
    query: {
      fullscreen: '',
      page: '',
      size: '',
    }
  },
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
