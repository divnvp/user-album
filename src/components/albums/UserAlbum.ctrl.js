import TableUserData from '../table/TableUserData.ctrl'
export default {
    name: 'UserAlbum',
    components: {
        TableUserData
    },
    data: function () {
        return {
            userId: this.$route.params.userId,
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

    methods: {
        getUserAlbum () {
            fetch(`https://jsonplaceholder.typicode.com/users/${this.userId}/albums`)
                .then((response) => response.json())
                .then((json) => {
                    this.albums = json
                });
        },
        goToPhoto (albumId) {
            this.$router.push({name: 'Photos', params: {albumId: albumId}})
                .then(r => r.params);
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

    created() {
        this.getUserAlbum();
    }
}
