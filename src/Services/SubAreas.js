import Cookies from 'js-cookie'//Here is the base API
import axios from './API'

export function getSubAreas() {
    const token = Cookies.get('token')
    return axios.get('/subareas/',{
        headers : {
            "Authorization" : `Token ${token}`
        }
    }).then(response => {
        return response.data
    }).catch(e => {
        throw e
    })
}

export async function addSubArea(name,area){
    const user = Cookies.getJSON('user')
    const token = Cookies.get('token')
    const formData = new FormData();
    console.log(area)
    formData.append("name", name);
    formData.append("area", area);
    return axios.post('/subareas/',formData,
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

export async function updateSubArea(name,area,id){
  const token = Cookies.get('token')
  const formData = new FormData();
  formData.append("name", name);
  formData.append("area", area);
  return axios.patch('/subareas/' + id + "/",formData,
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

export async function deleteSubArea(id){
  const token = Cookies.get('token')
  return axios.delete('/subareas/' + id + "/",
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