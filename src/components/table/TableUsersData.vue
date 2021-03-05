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

<script src="./TableUserData.ctrl.js"> </script>

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
