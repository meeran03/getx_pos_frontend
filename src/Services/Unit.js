import Cookies from 'js-cookie' //Here is the base API
import axios from './API'

export function getUnits() {
    const token = Cookies.get('token')
    return axios
        .get('/unit/', {
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

export async function addUnit(name) {
    const token = Cookies.get('token')
    return axios
        .post('/unit/', {
            name,
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

export async function updateUnit(name, id) {
    const token = Cookies.get('token')
    return axios
        .put('/unit/' + id + '/', {
            name,
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

export async function deleteUnit(id) {
    const token = Cookies.get('token')
    return axios
        .delete('/unit/' + id + '/', {
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
