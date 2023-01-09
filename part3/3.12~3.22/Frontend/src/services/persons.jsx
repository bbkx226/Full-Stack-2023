import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
  return axios.get(baseUrl)
}

const create = newObject => {
  return axios.post(baseUrl, newObject)
}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
}

const clearPerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}

const personService = {
  getAll,
  create,
  update,
  clearPerson
}

export default personService