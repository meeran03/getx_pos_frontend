import Cookies from 'js-cookie'//Here is the base API
import axios from './API'

export function getStores(num = 0, today = false) {
    const token = Cookies.get('token')
    let params = {};
    if (today) {
        params.today = today;
    }
    if (num > 0) {
        params.num = num
    }
    return axios.get(`/store/`, {
        headers: {
            "Authorization": `Token ${token}`
        },
        params
    }).then(response => {
        return response.data
    }).catch(e => {
        console.log(e.message, e.data)
    })
}

export function getStore(id) {
    const token = Cookies.get('token')
    return axios.get('/store/' + id + '/', {
        headers: {
            "Authorization": `Token ${token}`
        }
    }).then(response => {
        return response.data
    }).catch(e => {
        console.log(e.message, e.data)
    })
}

export async function registerStore(data) {
    console.log(data)
    const formData = new FormData();
    const token = Cookies.get('token')
    formData.append("username", data.name);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("password", data.password);
    formData.append('image', data.image);
    formData.append("is_store", true);
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
            console.log(e)
        })
}


export async function getStoreAreas(id) {
    const token = await Cookies.get('token')
    return axios.get('/storeareas/?store=' + id).then(response => {
        console.log(response.data)
        return response.data
    }).catch(e => {
        console.log(e)
        alert(e.message, JSON.stringify(e))
    })
}

export async function getStoreCustomers(subareas) {
    const token = await Cookies.get('token')
    return axios.get('/customer/?subareas=' + subareas).then(response => {
        console.log('This is from here', response.data)
        return response.data
    }).catch(e => {
        console.log(e)
        alert(e.message, JSON.stringify(e))
    })
}

export async function updateStore(data, id) {
    console.log(data)
    const formData = new FormData();
    const token = Cookies.get('token')
    formData.append("username", data.username);
    formData.append("owner_name", data.owner);
    if (data.password != "")
        formData.append("password", data.password);
    if (typeof (data.contractImage) != "string")
        formData.append("contract_image", data.contractImage);
    formData.append("push_token", data.token);
    formData.append("address", data.address);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    if (typeof (data.image) != "string")
        formData.append('image', data.image);
    formData.append("is_store", true);
    console.log(formData)
    return axios.patch('/store/' + id + "/", formData,
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
            console.log(e)
        })
}


export function deleteStoreArea(id) {
    const token = Cookies.get('token')
    return axios.delete('/storeareas/' + id + '/', {
        headers: {
            "Authorization": `Token ${token}`
        }
    }).then(response => {
        return response.data
    }).catch(e => {
        throw e
    })
}

export function deleteStore(id) {
    const token = Cookies.get('token')
    return axios.delete('/store/' + id + '/', {
        headers: {
            "Authorization": `Token ${token}`
        }
    }).then(response => {
        return response.data
    }).catch(e => {
        throw e
    })
}

export function addStoreArea(data) {
    const token = Cookies.get('token')
    let formData = new FormData()
    formData.append("store_id", data.store_id);
    formData.append("sub_area", data.sub_area);
    if (data.rider != null)
        formData.append("delivery_boy", data.rider);
    return axios.post('/storeareas/', formData, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${token}`
        }
    }).then(response => {
        return response.data
    }).catch(e => {
        throw e
    })
}

export function updateStoreArea(data) {
    const token = Cookies.get('token')
    let formData = new FormData()
    formData.append("store_id", data.store_id);
    formData.append("sub_area", data.sub_area);
    if (data.rider != null)
        formData.append("delivery_boy", data.rider);
    return axios.patch('/storeareas/' + data.id + "/", formData, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${token}`
        }
    }).then(response => {
        return response.data
    }).catch(e => {
        throw e
    })
}


export async function getStorePurchaseHistory(id, today = false, manual = false, manualObj = {}) {
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
    return axios.get('/order/?store=' + id, {
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