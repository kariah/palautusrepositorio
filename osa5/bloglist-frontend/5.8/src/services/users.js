import axios from 'axios' 
const baseUrl = 'api/users'  

const getAll = async () => { 
//   const config = {
//     headers: { Authorization: token },
//   }

  const request = axios.get(baseUrl) 
  const response = await request  
  
  return response.data 
} 


// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll }