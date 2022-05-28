import Cookies from 'js-cookie' //Here is the base API
import axios from './API'

export function getCategories() {
  const token = Cookies.get('token')
  return axios
    .get('/category/', {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    .then((response) => {
      return response.data
    })
    .catch((e) => {
      throw e
    })
}

export async function addCategory(name) {
  const token = Cookies.get('token')
  return axios
    .post('/category/', {
      name,
    }, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    .then((res) => {
      return res.data
    })
    .catch((e) => {
      console.log(e.response.data)
      throw e
    })
}

export async function updateCategory(name, id) {
  const token = Cookies.get('token')
  return axios
    .put('/category/' + id + '/', {
      name,
    }, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    .then((res) => {
      return res.data
    })
    .catch((e) => {
      console.log(e.response.data)
      throw e
    })
}

export async function deleteCategory(id) {
  const token = Cookies.get('token')
  return axios
    .delete('/category/' + id + '/', {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    .then((res) => {
      return res.data
    })
    .catch((e) => {
      console.log(e.response.data)
      throw e
    })
}
