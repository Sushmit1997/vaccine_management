const axios = require('axios');

// const remote = {
//   address: process.env.REACT_APP_API_URL
// }


const remote = {
  address: 'http://localhost:5000'
}

const getRequests = (api) => {
  let token = localStorage.getItem('token')
  const apiUrl = remote.address + api
  let promise = new Promise((resolve, reject) => {
    axios.get(apiUrl, { headers: { "Authorization": `${token}` } })
      .then(res => {
        var data = res.data
        resolve(data)
      })
      .catch(error => {
        var errorMessage = error.response.data.Message
        reject(errorMessage)
      })
  })
  return promise
}

const postRequests = (api, data) => {
  let token = localStorage.getItem('token')
  const apiUrl = remote.address + api
  let promise = new Promise((resolve, reject) => {
    axios.post(apiUrl, data, { headers: { "Authorization": `${token}` } })
      .then(res => {
        var data = res.data
        resolve(data)
      })
      .catch(error => {
        var errorMessage = error.response.data.Message
        reject(errorMessage)
      })
  })
  return promise
}

const patchRequests = (api, data) => {
  let token = localStorage.getItem('token')
  const apiUrl = remote.address + api
  let promise = new Promise((resolve, reject) => {
    axios.patch(apiUrl, data, { headers: { "Authorization": `${token}` } })
      .then(res => {
        var data = res.data
        resolve(data)
      })
      .catch(error => {
        var errorMessage = error.response.data.Message
        reject(errorMessage)
      })
  })
  return promise
}

const deleteRequests = (api) => {
  let token = localStorage.getItem('token')
  const apiUrl = remote.address + api
  let promise = new Promise((resolve, reject) => {
    axios.delete(apiUrl, { headers: { "Authorization": `${token}` } })
      .then(res => {
        var data = res.data
        resolve(data)
      })
      .catch(error => {
        var errorMessage = error.response.data.Message
        reject(errorMessage)
      })
  })
  return promise
}




var RemoteServices = {
  sendSignin: (data) => {
    const url = `/signin`
    return postRequests(url, data)
  },
  sendSignup: (data) => {
    const url = `/users/signup`
    return postRequests(url, data)
  },
  getVaccines: () => {
    const url = '/vaccines'
    return getRequests(url)
  },
  addVaccine: (data) => {
    const url = `/vaccines`
    return postRequests(url, data)
  },
  deleteVaccine: (id) => {
    const url = `/vaccines/${id}`
    return deleteRequests(url)
  },
  updateVaccine: (data, id) => {
    const url = `/vaccines/${id}`
    return patchRequests(url, data)
  },
  addRemoveMandate: (id) => {
    const url = `/vaccines/mandate/${id}`
    return getRequests(url)
  }
}

module.exports = RemoteServices
