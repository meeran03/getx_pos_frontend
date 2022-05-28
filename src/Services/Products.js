import Cookies from 'js-cookie' //Here is the base API
import AXIOS from './API'
import axios from 'axios'

export function getProducts(search = null, url = null) {
  const token = Cookies.get('token')
  let params = {}
  if (search != null) {
    params.search = search
  }
  if (url != null) {
    return axios
      .get(url, {
        headers: {
          Authorization: `Token ${token}`,
        },
        params: params,
      })
      .then((response) => {
        return response.data
      })
      .catch((e) => {
        throw e
      })
  }
  return AXIOS.get('/product/', {
    headers: {
      Authorization: `Token ${token}`,
    },
    params: params,
  })
    .then((response) => {
      return response.data
    })
    .catch((e) => {
      throw e
    })
}

export function getProduct(id) {
  const token = Cookies.get('token')
  return AXIOS.get('/product/' + id + '/', {
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

export async function addProduct(obj) {
  const user = Cookies.getJSON('user')
  const token = Cookies.get('token')
  const formData = new FormData()
  formData.append('name', obj.name)
  formData.append('type', obj.type)
  formData.append('unit_id', obj.unit_id)
  formData.append('category_id', obj.category_id)
  formData.append('description', obj.description)
  formData.append('image', obj.image)
  formData.append('variations', JSON.stringify(obj.variations))
  return AXIOS.post('/product/', formData, {
    headers: {
      Authorization: `Token ${token}`,
    },
  })
    .then((res) => {
      return res.data
    })
    .catch((e) => {
      console.log(e.response.data)
      console.log(e.message, JSON.stringify(e.response.data))
    })
}

export function deleteProduct(id) {
  const token = Cookies.get('token')
  return AXIOS.delete('/product/' + id + '/', {
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




// delete product variation
export function deleteProductVariation(id) {
  const token = Cookies.get('token')
  return AXIOS.delete('/product/variation/' + id + '/', {
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
// add Product variation
export function addProductVariation(obj) {
  const token = Cookies.get('token')
  return AXIOS.post('/product/variation/', obj, {
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

export async function updateProduct(obj) {
  const user = Cookies.getJSON('user')
  const token = Cookies.get('token')
  console.log(obj)
  const formData = new FormData()
  formData.append('name', obj.name)
  formData.append('type', obj.type)
  formData.append('unit_id', obj.unit_id)
  formData.append('category_id', obj.category_id)
  formData.append('description', obj.description)
  formData.append('image', obj.image)
  return AXIOS.put('/product/' + obj.id, formData, {
    headers: {
      Authorization: `Token ${token}`,
    },
  })
    .then((res) => {
      return res.data
    })
    .catch((e) => {
      console.log(e.response.data)
      console.log(e.message, JSON.stringify(e.response.data))
      throw e
    })
}

// search product
export function searchProducts(search) {
  const token = Cookies.get('token')
  return AXIOS.get('/product/search?query=' + search, {
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

export function searchProductVariations(search) {
  const token = Cookies.get('token')
  return AXIOS.get('/product/variation/search?query=' + search, {
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

// get best selling product variations
export function getBestSellingProductVariations() {
  const token = Cookies.get('token')
  return AXIOS.get('/product/best-selling/', {
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