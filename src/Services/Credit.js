import Cookies from 'js-cookie'


//Here is the base API
import axios from './API'




export async function getCreditRequests() {
    const token = Cookies.get('token')
    console.log(token)
    let params = {
        variant : "pending"
    };
    return axios.get('/payment/',{
        headers : {
            "Authorization" : `Token ${token}`
        },
        params : params
    }).then(response => {
        return response.data
    }).catch(e => {
        console.log(e.message,e.response.data)
    })
}

export async function getComplain(id) {
    const token = Cookies.get('token')
    return axios.get('/order/' + id + '/',{
        headers : {
            "Authorization" : `Token ${token}`
        }
    }).then(response => {
        return response.data
    }).catch(e => {
        console.log(e.message,e.response.data)
    })
}

export async function answerRequest(status,id){
    const formData = new FormData();
    const token = Cookies.get('token')
    if (status !=null) {
        formData.append("status",status)
    }
    return axios.patch('/payment/' + id + "/",formData,
    {
      headers : {
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


