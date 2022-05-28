import Cookies from 'js-cookie'//Here is the base API
import axios from './API'

export async function sendNotification(title,message,noType){
    const user = Cookies.getJSON('user')
    const token = Cookies.get('token')
    const formData = new FormData();
    formData.append("title", title);
    formData.append("message", message);
    formData.append("type_of", noType);
    return axios.post('/notification/',formData,
    {
        headers : {
            "Authorization" : `Token ${token}` 
      }
    }).then(res => {
      console.log(res);
      return res
    }).catch(e => {
        console.log(e.response.data)
      console.log(e.message,JSON.stringify(e.response.data))
    })
} 