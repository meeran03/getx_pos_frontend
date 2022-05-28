import Cookies from 'js-cookie'//Here is the base API
import axios from './API'

export function getSubscriptionTypes() {
    const token = Cookies.get('token')
    return axios.get('/subscription-type/',{
        headers : {
            "Authorization" : `Token ${token}`
        }
    }).then(response => {
        return response.data
    }).catch(e => {
        throw e
    })
}

export async function addSubscriptionType(name,interval){
    const user = Cookies.getJSON('user')
    const token = Cookies.get('token')
    const formData = new FormData();
    formData.append("name", name);
    formData.append("interval", interval);
    return axios.post('/subscription-type/',formData,
    {
        headers : {
            "Authorization" : `Token ${token}` 
      }
    }).then(res => {
      return res.data
    }).catch(e => {
        console.log(e.response.data)
        throw e
    })
}

export async function updateSubscriptionType(name,interval,id){
  const token = Cookies.get('token')
  const formData = new FormData();
  formData.append("name", name);
  formData.append("interval", interval);
  return axios.patch('/subscription-type/' + id + "/",formData,
  {
      headers : {
          "Authorization" : `Token ${token}` 
    }
  }).then(res => {
    return res.data
  }).catch(e => {
      console.log(e.response.data)
      throw e
  })
}

export async function deleteSubscriptionType(id){
  const token = Cookies.get('token')
  return axios.delete('/subscription-type/' + id + "/",
  {
      headers : {
          "Authorization" : `Token ${token}` 
    }
  }).then(res => {
    return res.data
  }).catch(e => {
      console.log(e.response.data)
      throw e
  })
}