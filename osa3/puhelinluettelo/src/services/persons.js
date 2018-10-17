import axios from "axios";

const baseURL = "/api/persons";

const getAll = () => {
  return axios.get(baseURL).then(response => response.data);
};

const create = (newPersonObject) => {
  return axios.post(baseURL, newPersonObject).then(response => response.data);
};

const update = (id,personObject) => {
    return axios.put(`${baseURL}/${id}`, personObject).then(response => response.data)
}

const deletePerson = (id) => {
    return axios.delete(`${baseURL}/${id}`)
}

export default { getAll, create, update, deletePerson }