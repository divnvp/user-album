<template>
  <div>
    <header>
      <button @click="$router.push({ name: 'Home' })">
        Назад
      </button>
      {{ albumId }}
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
            class="cursor-pointer"
          >
            <td>
              <img
                :src="photo.thumbnailUrl"
                @click="showPhotoFullscreen(photo.url)"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </main>

    <info-modal-photo v-if="showModal === true">
      <template #body>
        <img :src="fullscreenUrl" />
      </template>
      <template #footer>
        <button @click="closePhotoFullscreen">x</button>
      </template>
    </info-modal-photo>

    <footer>
      <button
        v-for="pageNumber in pages"
        @click="currentPage = pageNumber"
        :key="pageNumber"
      >
        {{ pageNumber }}
      </button>
    </footer>
  </div>
</template>

<script>
import { getPhotos } from "@/services/api.service";
import { createPagiable } from "@/utils";

import InfoModalPhoto from "./InfoModalPhoto";

export default {
  name: "AlbumPhoto",
  components: {
    InfoModalPhoto,
  },

  data() {
    return {
      albumId: this.$route.params.albumId,
      photos: [],
      pages: [],
      currentPage: 1,
      rowsPerPage: 9,
      showModal: false,
      fullscreenUrl: "",
    };
  },

  computed: {
    displayedPhotos() {
      return createPagiable(this.photos, this.currentPage, this.rowsPerPage);
    },
  },

  watch: {
    photos() {
      this.calculatePages();
    },
  },

  async created() {
    this.photos = await getPhotos(this.$route.params.albumId);

    if (this.$route.query && this.$route.query.fullscreenUrl) {
      this.fullscreenUrl = this.$route.query.fullscreenUrl;
      this.showModal = true;
    }
  },

  methods: {
    calculatePages() {
      let numberOfPages = Math.ceil(this.photos.length / this.rowsPerPage);
      for (let index = 1; index <= numberOfPages; index++) {
        this.pages.push(index);
      }
    },

    async showPhotoFullscreen(url) {
      if (!url) {
        return;
      }

      await this.$router.replace({
        ...this.$route,
        query: {
          fullscreenUrl: url,
        },
      });

      this.fullscreenUrl = url;
      this.showModal = true;
    },

    async closePhotoFullscreen() {
      await this.$router.replace({ ...this.$route, query: {} });
      this.showModal = false;
    },
  },
};
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

.cursor-pointer {
  cursor: pointer;
}
</style>
