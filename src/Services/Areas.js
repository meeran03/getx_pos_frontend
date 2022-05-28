import Cookies from 'js-cookie'//Here is the base API
import axios from './API'

export function getAreas() {
    const token = Cookies.get('token')
    return axios.get('/area/',{
        headers : {
            "Authorization" : `Token ${token}`
        }
    }).then(response => {
        return response.data
    }).catch(e => {
        throw e
    })
}

export async function addArea(name){
    const user = Cookies.getJSON('user')
    const token = Cookies.get('token')
    const formData = new FormData();
    formData.append("name", name);
    formData.append("city", 1);
    return axios.post('/area/',formData,
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

export async function updateArea(name,id){
  const token = Cookies.get('token')
  const formData = new FormData();
  formData.append("name", name);
  return axios.patch('/area/' + id + "/",formData,
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

export async function deleteArea(id){
  const token = Cookies.get('token')
  return axios.delete('/area/' + id + "/",
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