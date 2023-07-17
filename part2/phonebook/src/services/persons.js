import axios from "axios";

const server = process.env.REACT_APP_SERVER || "localhost";
const port = process.env.REACT_APP_SERVER_PORT || 3001;

const baseUrl = `http://${server}:${port}/persons`;

const getAll = () => axios.get(baseUrl).then(response => response.data);

const create = (newPerson) => axios.post(baseUrl, newPerson).then(response => response.data);

const update = (id, newPerson) => axios.put(`${baseUrl}/${id}`, newPerson).then(response => response.data);

const del = (id) => axios.delete(`${baseUrl}/${id}`).then(response => response.data);

const exports = { getAll, create, update, del }
export default exports;