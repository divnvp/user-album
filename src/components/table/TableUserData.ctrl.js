export default {
    name: 'TableUsersData',
    data: function () {
        return {
            users: [],
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
            fetch("https://jsonplaceholder.typicode.com/users")
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
            // fetch(`https://jsonplaceholder.typicode.com/users/${userId}/albums`)
            //     .then((response) => response.json())
            //     .then((json) => console.log(json));
            this.$router.push({name: 'Albums', params: {userId}}).then(r => console.log(r));
         }
    },

    mounted() {
        this.getUsers();
    },
}
