import Cookies from 'js-cookie'


//Here is the base API
import axios from './API'




export async function getComplains(page,today=false) {
    const token = Cookies.get('token')
    let params = {};
    if (today) {
        params.today = today;
    }
    return axios.get('/complain/?page=' + page,{
        headers : {
            "Authorization" : `Token ${token}`
        },
        params : params
    }).then(response => {
        return response.data
    }).catch(e => {
        throw e
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

export async function answerComplain(answer,id){
    const formData = new FormData();
    const token = Cookies.get('token')
    formData.append('answer',answer)
    if (answer !=null) {
        formData.append("answered",true)
    }
    return axios.patch('/complain/' + id + "/",formData,
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


