<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>id</th>
          <th>name</th>
          <th>phone</th>
          <th>username</th>
          <th>company</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in getUsersForCurrentPage"
            :key="user.id"
            @click="goToPersonAlbum(user.id)">
          <td>{{user.id}}</td>
          <td>{{user.name}}</td>
          <td>{{user.phone}}</td>
          <td>{{user.username}}</td>
          <td>{{user.company.name}}</td>
        </tr>
      </tbody>
    </table>
    <p>
      <button @click="nextPage"
              v-for="page in pages"
              :key="page">
        {{page}}
      </button>
    </p>
  </div>
</template>

<script>
export default {
  name: 'TableUsersData',
  data: function () {
    return {
      users: [],
      GET_USERS: "https://jsonplaceholder.typicode.com/users",
      pages: [],
      currentPage: 0,
      rowsPerPage: 4,
    }
  },

  computed: {
    getUsersForCurrentPage: function () {
      return this.users.slice(this.currentPage, this.rowsPerPage)
    }
  },

  methods: {
    getUsers () {
      fetch(this.GET_USERS)
        .then(response => response.json())
        .then(json => {
          this.users = json
          console.log(this.users)
          let nums = 0;
          for (let i = 0; i < this.users.length; i++) {
            this.pages = nums++;
          }
        })
        .catch(e => console.log(e))
    },
    nextPage:function() {

      // if((this.currentPage*this.rowsPerPage) < this.users.length) this.currentPage++;
      // if(this.currentPage > 1) this.currentPage--;
    },
    goToPersonAlbum (userId) {
      fetch(`https://jsonplaceholder.typicode.com/users/${userId}/albums`)
          .then((response) => response.json())
          .then((json) => console.log(json));
    }
  },

  mounted() {
    this.getUsers();
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

tr:hover{
  cursor: pointer;
}
</style>
