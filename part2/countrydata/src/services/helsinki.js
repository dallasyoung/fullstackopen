import axios from "axios";

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/";

const getCountries = () => axios.get(`${baseUrl}/api/all`).then(response => response.data);

const exports = { getCountries };
export default exports;