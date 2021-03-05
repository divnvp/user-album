<template>
  <div>

    <header>
      <button @click="$router.push({name: 'Home'})">
        Назад
      </button>
      {{userId}}
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

<script src="./UserAlbum.ctrl.js"></script>

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
