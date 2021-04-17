import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'


const getAll = () => { 
    const request = axios.get(baseUrl)  
    const nonExisting = {
        id: -1,
        name: '',
        number: '', 
    }
    return request.then(response => response.data.concat(nonExisting))  
    
   /* return request.then(response => response.data)   */
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
} 


//const update = (id, newObject) => {
//    const request = axios.put(`${baseUrl}/${id}`, newObject)
//    return request.then(response => response.data)
//}


const remove = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`) 
    return request.then(response => response.status) 
}


export default {
    getAll, create, remove
}