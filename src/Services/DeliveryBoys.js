import Cookies from 'js-cookie'//Here is the base API
import axios from './API'

export function getDeliveryBoys(storeareas = false, num = 0, today = false) {
    const token = Cookies.get('token')
    let params = {};
    if (today) {
        params.today = today;
    }
    if (num > 0) {
        params.num = num
    }
    if (storeareas) {
        params.storeareas = true
    }
    return axios.get(`/deliveryboy/`, {
        headers: {
            "Authorization": `Token ${token}`
        },
        params: params
    }).then(response => {
        return response.data
    }).catch(e => {
        throw e
    })
}

export function getDeliveryBoy(id) {
    const token = Cookies.get('token')
    return axios.get('/deliveryboy/' + id + '/', {
        headers: {
            "Authorization": `Token ${token}`
        }
    }).then(response => {
        return response.data
    }).catch(e => {
        throw e
    })
}

export function deleteDeliveryBoy(id) {
    const token = Cookies.get('token')
    return axios.delete('/deliveryboy/' + id + '/', {
        headers: {
            "Authorization": `Token ${token}`
        }
    }).then(response => {
        return response.data
    }).catch(e => {
        throw e
    })
}

export async function registerDeliveryBoy(data) {
    console.log(data)
    const formData = new FormData();
    const token = Cookies.get('token')
    formData.append("username", data.name);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("password", data.password);
    formData.append('image', data.image);
    formData.append("is_deliveryBoy", true);
    console.log(formData)
    return axios.post('/auth/register/', formData,
        {
            headers: {
                "Authorization": `Token ${token}`
            }
        })
        .then(res => {
            console.log(res.data)
            return res.data
        })
        .catch(e => {
            throw e
        })
}


export async function updateBoy(data, id) {
    console.log(data)
    const formData = new FormData();
    const token = Cookies.get('token')
    formData.append("username", data.username);
    if (data.password != "")
        formData.append("password", data.password);
    formData.append("push_token", data.token);
    formData.append("address", data.address);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("status", data.status);
    if (typeof (data.image) != "string")
        formData.append('image', data.image);
    console.log(formData)
    return axios.patch('/deliveryboy/' + id + "/", formData,
        {
            headers: {
                "Authorization": `Token ${token}`
            }
        })
        .then(res => {
            console.log(res.data)
            return res.data
        })
        .catch(e => {
            throw e
        })
}


export async function getRiderPurchaseHistory(id, today = false, manual = false, manualObj = {}) {
    const token = await Cookies.get('token')
    let params = {};
    if (today) params.today = today;
    else if (manual) {
        params.manual = manual;
        params.start = ((manualObj.start).getTime() / 1000);
        params.end = ((manualObj.end).getTime() / 1000);
    }
    else {
        params.recent = true
    }
    return axios.get('/order/?deliveryBoy=' + id, {
        headers: {
            "Authorization": `Token ${token}`
        },
        params: params
    }).then(response => {
        console.log(response.data)
        return response.data
    }).catch(e => {
        throw e;
    })
}