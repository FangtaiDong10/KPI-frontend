import axios from "axios";

axios.defaults.timeout = 5000;

axios.defaults.baseURL = import.meta.env.VITE_API_BASE;

export default axios;
