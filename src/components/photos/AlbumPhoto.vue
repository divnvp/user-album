<template>
  <div>
    <header>
      <button @click="goToBack()">
        Назад
      </button>
      {{albumId}}
    </header>

    <main>
      <table>
        <thead>
        <th>image</th>
        </thead>
        <tbody>
        <tr
            v-for="photo in displayedPhotos"
            :key="photo.id"
            class="cursor-pointer">
          <td>
            <img :src="photo.thumbnailUrl"
                 @click="showModal = photo.id">
            <info-modal-photo v-if="showModal === photo.id">
              <template #header>
                <h3>{{photo.id}}</h3>
              </template>
              <template #body>
                <h3>title: {{photo.title}}</h3>
                <img :src="photo.url">
              </template>
              <template #footer>
                <button @click="showModal = null">
                  X
                </button>
              </template>
            </info-modal-photo>
          </td>
        </tr>
        </tbody>
      </table>
    </main>

    <footer>
      <button v-for="pageNumber in pages"
              @click="currentPage = pageNumber"
              :key="pageNumber">
        {{pageNumber}}
      </button>
    </footer>

  </div>
</template>

<script>
import InfoModalPhoto from './InfoModalPhoto'
import {getPhotos, getPhotosQuery} from '@/services/api.service'
export default {
  name: 'AlbumPhoto',
  components: {
    InfoModalPhoto,
  },

  data () {
    return {
      albumId: this.$route.params.albumId,
      photos: [],
      pages: [],
      currentPage: 1,
      rowsPerPage: 9,
      showModal: null,
    }
  },

  computed: {
    displayedPhotos () {
      return this.paginate(this.photos);
    }
  },

  watch: {
    photos () {
      this.calculatePages();
    },
    currentPage () {
      this.linkExist(this.currentPage, this.rowsPerPage);
    },
  },

  //Если нужные параметры есть,
  // то в хуке жизненного цикла created() присвоить эти значения
  // в инициализированные переменные объекта data() {}

  //Выполныть необходимые запросы с сервера, путем вызова соответсвующих методов из сервиса с описание API
  async created() {
    if (this.linkExist()) {
      this.photos.url = this.$route.query.fullscreen;
      this.currentPage = this.$route.query.page;
      this.rowsPerPage = this.$route.query.size;
      this.photos = await getPhotosQuery(this.$route.params.albumId, this.photos.url, this.currentPage, this.rowsPerPage);
    } else {
      this.photos = await getPhotos(this.$route.params.albumId);
    }
  },

  methods: {
    calculatePages () {
      let numberOfPages = Math.ceil(this.photos.length / this.rowsPerPage);
      for (let index = 1; index <= numberOfPages; index++) {
        this.pages.push(index);
      }
    },
    paginate (users) {
      let page = this.currentPage;
      let perPage = this.rowsPerPage;
      let from = (page * perPage) - perPage;
      let to = (page * perPage);
      return  users.slice(from, to);
    },
    goToBack () {
      this.$router.push({name: 'Home',
        query: (route) => ({
          page: route.query.page,
          size: route.query.size})
      })
    },
    //Проверить наличие URL адреса на необходимые query параметры
    linkExist() {
      return !(this.$route.query.page === undefined && this.$route.query.size === undefined
          && this.$route.query.fullscreen);
    }
  },
}
</script>

<style>
table {
  table-layout: fixed;
  width: 100%;
  border-collapse: collapse;
}

thead {
  border: 3px solid black;
}

.cursor-pointer{
  cursor: pointer;
}

</style>
