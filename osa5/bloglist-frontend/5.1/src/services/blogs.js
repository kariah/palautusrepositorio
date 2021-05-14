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
 
// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, setToken, 
}
