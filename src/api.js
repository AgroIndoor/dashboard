import axios from "axios";

const api = axios.create({
    baseURL:"http://localhost:3070"
})
export default api;