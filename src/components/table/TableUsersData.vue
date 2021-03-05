<template>
  <div>
    <header>
      Search
      <input v-model="search">
    </header>
    <p></p>

    <table>
      <thead>
        <tr>
          <th>id</th>
          <th @click="sortBy('name')">name</th>
          <th>phone</th>
          <th>username</th>
          <th>company</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in displayedUsers"
            :key="user.id"
            @click="goToPersonAlbum(user.id)"
            class="cursor-pointer">
          <td>{{user.id}}</td>
          <td>{{user.name}}</td>
          <td>{{user.phone}}</td>
          <td>{{user.username}}</td>
          <td>{{user.company.name}}</td>
        </tr>
      </tbody>
    </table>

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
import {getUsers} from "@/services/api.service";
export default {
  name: 'TableUsersData',
  data () {
    return {
      search: '',
      users: [],
      pages: [],
      currentPage: 1,
      rowsPerPage: 4,
      sort: {
        key: '',
        isAsc: false
      },
    }
  },

  computed: {
    displayedUsers () {
      return this.pagiabledUsers.filter(users => {
        return users.name.toLowerCase().includes(this.search.toLowerCase())
      }).sort((a, b) => {
        a = a[this.sort.key]
        b = b[this.sort.key]

        return (a === b ? 0 : a > b ? 1 : -1) * (this.sort.isAsc ? 1 : -1)
      });
    },
    pagiabledUsers () {
      let page = this.currentPage;
      let perPage = this.rowsPerPage;
      let from = (page * perPage) - perPage;
      let to = (page * perPage);
      return this.users.slice(from, to);
    }
  },

  watch: {
    users () {
      this.calculatePages();
    }
  },

  async created() {
    this.users = await getUsers(this.currentPage, this.rowsPerPage)
  },

  methods: {
    async goToPersonAlbum (userId) {
      await this.$router.push({name: 'Albums', params: {userId: userId}});
    },
    calculatePages () {
      let numberOfPages = Math.ceil(this.users.length / this.rowsPerPage);
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
    sortBy (key) {
      this.sort.isAsc = this.sort.key === key ? !this.sort.isAsc : false;
      this.sort.key = key;
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
