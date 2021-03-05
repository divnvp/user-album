import InfoModalPhoto from './InfoModalPhoto'
export default {
    name: 'AlbumPhoto',
    components: {
        InfoModalPhoto
    },

    data: function () {
        return {
            albumId: this.$route.params.albumId,
            photos: [],
            pages: [],
            currentPage: 1,
            rowsPerPage: 9,
            showModal: false,
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
        }
    },

    methods: {
        getPhotos () {
            fetch(`https://jsonplaceholder.typicode.com/albums/${this.albumId}/photos`)
                .then((response) => response.json())
                .then((json) => {
                    this.photos = json
                });
        },
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
        }
    },

    created() {
        this.getPhotos();
    }
}
