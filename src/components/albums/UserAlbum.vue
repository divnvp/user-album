<template>
  <div>

    <header>
      <button @click="$router.push({name: 'Home'})">
        Назад
      </button>
      {{$route.params.userId}}
    </header>

    <main>
      <table>
        <thead>
        <th>title</th>
        </thead>
        <tbody>
        <tr v-for="album in displayedAlbums"
            :key="album.id"
            @click="goToPhoto(album.id)"
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
import {getUserAlbum} from '@/services/api.service'
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
    }
  },

  async created() {
    this.albums = await getUserAlbum(this.$route.params.userId);
  },

  methods: {
    async goToPhoto (albumId) {
      await this.$router.push({name: 'Photos', params: {albumId: albumId}});
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
