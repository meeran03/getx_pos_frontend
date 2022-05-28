import Cookies from 'js-cookie' //Here is the base API
import axios from './API'

export function getDiscounts() {
    const token = Cookies.get('token')
    return axios
        .get('/discount/', {
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

export async function addDiscount(data) {
    const token = Cookies.get('token')
    return axios
        .post('/discount/', data, {
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

export async function updateDiscount(data, id) {
    const token = Cookies.get('token')
    return axios
        .put('/discount/' + id + '/', data, {
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

export async function deleteDiscount(id) {
    const token = Cookies.get('token')
    return axios
        .delete('/discount/' + id + '/', {
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
