function getUserAlbum (userId) {
    return fetch(`https://jsonplaceholder.typicode.com/users/${userId}/albums`)
        .then((response) => response.json())
}

function getPhotos (albumId) {
    return fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}/photos`)
        .then((response) => response.json())
}

function getUsers() {
    return fetch(`https://jsonplaceholder.typicode.com/users`)
        .then(response => response.json())
}

function getUsersQuery(page, size) {
    return fetch(`https://jsonplaceholder.typicode.com/users?page=${page}&size=${size}`)
        .then(response => response.json())
}

function getUserAlbumQuery (userId, page, size) {
    return fetch(`https://jsonplaceholder.typicode.com/users/${userId}/albums?page=${page}&size=${size}`)
        .then((response) => response.json())
}

function getPhotosQuery (albumId, fullscreen, page, size) {
    return fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}/photos?page=${page}&size=${size}?fullscreen=${fullscreen}`)
        .then((response) => response.json())
}

export { getUsers, getPhotos, getUserAlbum, getUsersQuery, getUserAlbumQuery, getPhotosQuery }
