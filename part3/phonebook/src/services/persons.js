import axios from "axios";

// Note that I can't use the same `proxy` solution given in the course material
// since I've been running all this code so far in Docker containers. To work
// around this instead, I'll use React's environment variable capabilities like
// we learned in the previous parts 

const server = process.env.REACT_APP_API_SERVER_ADDRESS;
const port = process.env.REACT_APP_API_SERVER_PORT;
const apiPath = process.env.REACT_APP_API_URL_PATH || `/api/persons`;

const baseUrl = (server && port) ? 
    `http://${server}:${port}${apiPath}` :
    `${apiPath}`;
console.log(`'persons' API services expected at ${baseUrl}`);

const getAll = () => axios.get(baseUrl).then(response => response.data);

const create = (newPerson) => axios.post(baseUrl, newPerson).then(response => response.data);

const update = (id, newPerson) => axios.put(`${baseUrl}/${id}`, newPerson).then(response => response.data);

const del = (id) => axios.delete(`${baseUrl}/${id}`).then(response => response.data);

const exports = { getAll, create, update, del }
export default exports;