import axios from "axios";

axios.defaults.baseURL = 'http://localhost:8000/api/';
axios.defaults.withCredentials = true;
axios.defaults.headers = {
    'content-type': 'application/josn'
};



export default axios;