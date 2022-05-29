import Cookies from 'js-cookie'


//Here is the base API
import axios from './API'
import { baseURL } from './Constants';
import moment from 'moment';



export async function getSales() {
    const token = Cookies.get('token')
    let params = {};
    // we need to get sales of current month by using startDate and endDate
    let startDate = moment().startOf('month').format('YYYY-MM-DD');
    let endDate = moment().endOf('month').format('YYYY-MM-DD');
    params = {
        startDate: startDate,
        endDate: endDate
    }
    return axios.get('/sales/', {
        headers: {
            "Authorization": `Token ${token}`
        },
        params: params
    }).then(response => {
        return response.data
    }).catch(e => {
        console.log(e.message, e.response.data)
    })
}

export async function getSaleHistory(today = false, yesterday = false, week = false, month = false, manual = false, manualObj = {}) {
    const token = Cookies.get('token')
    let params = {};
    if (today) params.today = today;
    else if (yesterday) params.yesterday = yesterday;
    else if (week) params.week = week;
    else if (month) params.monthly = month;
    else if (manual) {
        params.manual = manual;
        console.log('obj', (manualObj))
        params.start = ((manualObj.start).getTime() / 1000);
        params.end = ((manualObj.end).getTime() / 1000);
    }
    else {
        params.recent = true
    }
    return axios.get('/sale/', {
        headers: {
            "Authorization": `Token ${token}`
        },
        params: params
    }).then(response => {
        return response.data
    }).catch(e => {
        alert(e.message, (e.response.data.detail))
    })
}

export async function getSale(id) {
    const token = Cookies.get('token')
    return axios.get('/sales/' + id + '/', {
        headers: {
            "Authorization": `Token ${token}`
        }
    }).then(response => {
        return response.data
    }).catch(e => {
        console.log(e.message, e.response.data)
    })
}


export async function getCancelledSales(status, search) {
    const token = Cookies.get('token')
    let params = {};
    if (search != null) {
        params.search = search
    }
    params.status = status
    return axios.get(`/cancelled-sale/?type=JAZZ`, {
        headers: {
            "Authorization": `Token ${token}`
        },
        params: params
    }).then(response => {
        return response.data
    }).catch(e => {
        console.log(e.message, e.response.data)
    })
}

export function socket() {
    let socket = new WebSocket(`ws://${baseURL}/ws/sales/`)
    return socket
}


// add sale
export async function addSale(data) {
    const token = Cookies.get('token')
    return axios.post('/customer/sale/', data, {
        headers: {
            "Authorization": `Token ${token}`
        }
    }).then(response => {
        return response.data
    }).catch(e => {
        console.log(e.message, e.response.data)
    })
}
