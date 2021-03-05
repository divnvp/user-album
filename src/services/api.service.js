function getUserAlbum (userId) {
    return fetch(`https://jsonplaceholder.typicode.com/users/${userId}/albums`)
        .then((response) => response.json())
}

function getPhotos (albumId, fullscreenUrl) {
    return fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}/photos?fullscreen=${fullscreenUrl}`)
        .then((response) => response.json())
}

function getUsers(currentPage, rowsPerPage) {
    return fetch(`https://jsonplaceholder.typicode.com/users?page=${currentPage}&size=${rowsPerPage}`)
        .then(response => response.json())
}

export { getUsers, getPhotos, getUserAlbum }

