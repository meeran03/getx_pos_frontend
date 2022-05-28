import Cookies from 'js-cookie'


//Here is the base API
import axios from './API'
import { baseURL } from './Constants'




export async function getSubscriptions() {
    const token = Cookies.get('token')
    return axios.get('/subscription/',{
        headers : {
            "Authorization" : `Token ${token}`
        }
    }).then(response => {
        return response.data
    }).catch(e => {
        console.log(e.message,e.response.data)
    })
}

export async function getSubscription(id) {
    const token = Cookies.get('token')
    return axios.get('/subscription/' + id + '/',{
        headers : {
            "Authorization" : `Token ${token}`
        }
    }).then(response => {
        return response.data
    }).catch(e => {
        console.log(e.message,e.response.data)
    })
}


export function socket() {
    let socket = new WebSocket(`ws://${baseURL}/ws/subscriptions/`)
    return socket
}
