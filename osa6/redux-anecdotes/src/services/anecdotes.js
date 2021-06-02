import axios from 'axios' 

const baseUrl = 'http://localhost:3001/api/anecdotes'

//cuild version
//const baseUrl = '/api/persons'


const getAll = () => { 
    console.log('test')
    const request = axios.get(baseUrl)   
    return request.then(response => response.data)   
}

// const create = newObject => {
//     const request = axios.post(baseUrl, newObject)
//     return request.then(response => response.data)
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
    // create: create,
    // update: update,
    // remove: remove,
}

export default anecdotes