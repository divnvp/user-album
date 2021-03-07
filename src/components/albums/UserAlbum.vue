<template>
  <div>

    <header>
      <button @click="$router.push({name: 'Home'})">
        Назад
      </button>
      {{$route.query.userId}}
    </header>

    <main>
      <table>
        <thead>
        <th>title</th>
        </thead>
        <tbody>
        <tr v-for="album in displayedAlbums"
            :key="album.id"
            @click="goToPhoto(album.id, currentPage, rowsPerPage)"
            class="cursor-pointer">
          {{album.title}}
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
import {getUserAlbum, getUserAlbumQuery} from '@/services/api.service'
export default {
  name: 'UserAlbum',
  data () {
    return {
      albums: [],
      pages: [],
      currentPage: 1,
      rowsPerPage: 4,
    }
  },

  computed: {
    displayedAlbums () {
      return this.paginate(this.albums);
    }
  },

  watch: {
    albums () {
      this.calculatePages();
    },
  },

  //Если нужные параметры есть,
  // то в хуке жизненного цикла created() присвоить эти значения
  // в инициализированные переменные объекта data() {}

  //Выполныть необходимые запросы с сервера, путем вызова соответсвующих методов из сервиса с описание API
  async created() {
    if (this.linkExist()) {
      this.currentPage = this.$route.query.page;
      this.rowsPerPage = this.$route.query.size;
      this.albums = await getUserAlbumQuery(this.$route.query.userId, this.currentPage, this.rowsPerPage)
    } else {
      this.albums = await getUserAlbum(this.$route.query.userId);
    }
  },

  methods: {
    async goToPhoto (albumId, page, size) {
      await this.$router.push({name: 'Photos', query: {albumId: albumId, page: page, size: size}});
    },
    calculatePages () {
      let numberOfPages = Math.ceil(this.albums.length / this.rowsPerPage);
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
    //Проверить наличие URL адреса на необходимые query параметры
    linkExist() {
      return !(this.$route.query.page === undefined && this.$route.query.size === undefined);
    }
  },
}
</script>

<style>
table {
  table-layout: fixed;
  width: 100%;
  border-collapse: collapse;
  font-size: 14pt;
}

thead {
  border: 3px solid black;
}

.cursor-pointer{
  cursor: pointer;
}

</style>
