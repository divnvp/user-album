import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/table/TableUsersData'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: `/:userId/albums`,
    name: 'Albums',
    component: () => import('../components/albums/UserAlbum'),
  },
  {
    path: `/albums/:albumId`,
    name: 'Photos',
    component: () => import('../components/photos/AlbumPhoto'),
  },
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
