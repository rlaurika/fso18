import axios from 'axios'
const baseUrl = '/api/blogs'

let token = ''

const setToken = (tokenToSet) => {
  token = `bearer ${tokenToSet}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

export default { setToken, getAll }