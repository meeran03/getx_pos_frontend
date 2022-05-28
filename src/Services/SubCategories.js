import Cookies from 'js-cookie' //Here is the base API
import axios from './API'

export function getSubCategories() {
  const token = Cookies.get('token')
  return axios
    .get('/product-subcategory/', {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    .then((response) => {
      return response.data
    })
    .catch((e) => {
      console.log(e.message, e.response.data)
    })
}

export async function addSubCategory(name, category, tags) {
  const user = Cookies.getJSON('user')
  const token = Cookies.get('token')
  const formData = new FormData()
  formData.append('name', name)
  formData.append('category', category)
  if (tags != null) formData.append('tags', JSON.stringify(tags.split(',')))
  else formData.append('tags', JSON.stringify([]))
  return axios
    .post('/product-subcategory/', formData, {
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

export async function getSubCategoriesByCategory(category) {
  const user = Cookies.getJSON('user')
  const token = Cookies.get('token')
  return axios
    .get('/product-subcategory/?category=' + category, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    .then((res) => {
      return res.data
    })
    .catch((e) => {
      throw e
    })
}

export async function updateSubCategory(name, category, tags, id) {
  const token = Cookies.get('token')
  const formData = new FormData()
  formData.append('name', name)
  formData.append('category', category)
  console.log(tags)
  if (tags == '') formData.append('tags', JSON.stringify([]))
  else if (tags != null) {
    console.log(tags)
    let tagger
    if (tags.length == 1) tagger = tags
    else if (tags.constructor == Array) {
      tagger = tags
    } else tagger = tags.split()
    formData.append('tags', JSON.stringify(tagger))
  } else formData.append('tags', JSON.stringify([]))
  return axios
    .patch('/product-subcategory/' + id + '/', formData, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    .then((res) => {
      return res.data
    })
    .catch((e) => {
      console.log(e)
      throw e
    })
}

export async function deleteSubCategory(id) {
  const token = Cookies.get('token')
  return axios
    .delete('/product-subcategory/' + id + '/', {
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
