import axios from 'axios' 
const baseUrl = 'api/blogs' 
let token = null 

const getAll = async () => { 
  const config = {
    headers: { Authorization: token },
  }

  const request = axios.get(baseUrl, config) 
  const response = await request  
   
  return response.data 
} 

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  } 
 
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, updateObject) => {
  const config = {
    headers: { Authorization: token },
  }
 
  const request = axios.put(`${baseUrl}/${id}`, updateObject, config)
  const response = await request
  return response.data
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
 
  const request = axios.put(`${baseUrl}/${id}`, config)
  const response = await request
  return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, setToken, create, update, remove }