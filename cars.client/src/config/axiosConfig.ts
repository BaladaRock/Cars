import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5274';
console.log('Axios baseURL set to:', axios.defaults.baseURL);

export default axios;