import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'
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

const update = async (updateObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const request = axios.put(`${baseUrl}/${updateObject.id}`, updateObject, config)
  const response = await request
  return response.data
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  }

  const request = axios.delete(`${baseUrl}/${id}`, config)
  const response = await request
  return response.status
}

const addComment = async (blogObject, addedComment) => {
  const config = {
    headers: { Authorization: token },
  }

  const blogId = blogObject.id
  const url = `${baseUrl}/${blogId}/comments`
  const commentObject = { content: addedComment, blog : blogObject.id }
  const response = await axios.post(url, commentObject, config)
  console.log('response ', response)
  return response.data
}

export default { getAll, setToken, create, update, remove, addComment }