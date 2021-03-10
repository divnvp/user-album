import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../components/table/TableUsersData.vue')
  },
  {
    path: `/:userId/albums`,
    name: 'Albums',
    component: () => import('../components/albums/UserAlbum.vue'),
  },
  {
    path: `/albums/:albumId`,
    name: 'Photos',
    component: () => import('../components/photos/AlbumPhoto.vue'),
  },
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
