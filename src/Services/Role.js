import Cookies from 'js-cookie' //Here is the base API
import axios from './API'

export function getRoles() {
    const token = Cookies.get('token')
    return axios
        .get('/role/', {
            headers: {
                Authorization: `Token ${token}`,
            },
        })
        .then((response) => {
            return response.data
        })
        .catch((e) => {
            throw e
        })
}

export function getPermissions() {
    const token = Cookies.get('token')
    return axios
        .get('/permission/', {
            headers: {
                Authorization: `Token ${token}`,
            },
        })
        .then((response) => {
            return response.data
        })
        .catch((e) => {
            throw e
        })
}

export async function addRole(name, permissions) {
    const token = Cookies.get('token')
    return axios
        .post('/role/', {
            name,
            permissions,
        }, {
            headers: {
                Authorization: `Token ${token}`,
            },
        })
        .then((res) => {
            return res.data
        })
        .catch((e) => {
            console.log(e.response.data)
            throw e
        })
}

export async function updateRole(name, permissions, id) {
    const token = Cookies.get('token')
    return axios
        .put('/role/' + id + '/', {
            name,
            permissions
        }, {
            headers: {
                Authorization: `Token ${token}`,
            },
        })
        .then((res) => {
            return res.data
        })
        .catch((e) => {
            console.log(e.response.data)
            throw e
        })
}

export async function deleteRole(id) {
    const token = Cookies.get('token')
    return axios
        .delete('/role/' + id + '/', {
            headers: {
                Authorization: `Token ${token}`,
            },
        })
        .then((res) => {
            return res.data
        })
        .catch((e) => {
            console.log(e.response.data)
            throw e
        })
}
