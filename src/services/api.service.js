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

export { getUsers, getPhotos, getUserAlbum }
