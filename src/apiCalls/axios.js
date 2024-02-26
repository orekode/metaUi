import axios from "axios";

axios.defaults.baseURL = 'https://api.metasfoundation.org/api/';
axios.defaults.withCredentials = true;
axios.defaults.headers = {
    'content-type': 'application/josn'
};



export default axios;