<template>
  <div>
    <header>
      <button @click="$router.push({name: 'Home'})">
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
                 @click="showModal = true">
            <info-modal-photo v-show="showModal">
              <template #header>
                <h3>{{photo.id}}</h3>
              </template>
              <template #body>
                <h3>title: {{photo.title}}</h3>
                <img :src="photo.url">
              </template>
              <template #footer>
                <button @click="showModal = false">
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

<script src="./AlbumPhoto.ctrl.js"></script>

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
