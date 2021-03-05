export default {
    name: 'TableUsersData',
    data: function () {
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

    methods: {
        getUsers () {
            fetch("https://jsonplaceholder.typicode.com/users")
                .then(response => response.json())
                .then(json => {
                    this.users = json
                })
                .catch(e => console.log(e))
        },
        goToPersonAlbum (userId) {
            this.$router.push({name: 'Albums', params: {userId: userId}})
                .then(r => r.params);
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

    created() {
        this.getUsers();
    },
}
