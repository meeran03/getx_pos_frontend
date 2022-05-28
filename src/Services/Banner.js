import Cookies from 'js-cookie'//Here is the base API
import axios from './API'

export function getBanners () {
    const token = Cookies.get('token')
    return axios.get('/banner/',{
        headers : {
            "Authorization" : `Token ${token}`
        }
    }).then(response => {
        return response.data
    }).catch(e => {
        throw e
    })
}

  export async function addBanner(image){
    const user = Cookies.getJSON('user')
    const token = Cookies.get('token')
    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", "DEFAULT");
    return axios.post('/banner/',formData,
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

export async function deleteBanner(id){
  const token = Cookies.get('token')
  return axios.delete('/banner/' + id + "/",
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