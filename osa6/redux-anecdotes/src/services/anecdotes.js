import axios from 'axios'  
const baseUrl = 'http://localhost:3001'

//cuild version
//const baseUrl = '/api/persons'


const getAll = () => {  
    const request = axios.get(`${baseUrl}/api/anecdotes`)   
    return request.then(response => response.data)   
}

const createNew = async NewAnecdote => {
    console.log('createNew ', NewAnecdote)
    const request = axios.post(`${baseUrl}/api/anecdotes`, NewAnecdote)
    const response = await request
    return response.data
} 


const update = async (updateObject) => {  
    console.log('update ', updateObject)

    const response = await axios.put(`${baseUrl}/${updateObject.id}`, updateObject)
 
    return response.data.changedAnecdote
}

// const create = async newObject => {  
//     const request = axios.post(baseUrl, newObject)
//     const response = await request

//     console.log(' response.data ',  response.data)
//     return response.data
// } 

// const update = (id, newObject) => {
//     const request = axios.put(`${baseUrl}/${id}`, newObject) 
//     return request
//         .then(response => response.data)
//         .error(error => error.response.data)
// }


// const remove = (id) => {
//     const request = axios.delete(`${baseUrl}/${id}`) 
//     return request.then(response => response.status) 
// }

const anecdotes = {
    getAll: getAll,
    createNew: createNew,
    update: update,
    // remove: remove,
}

export default anecdotes