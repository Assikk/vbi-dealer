import axios from 'axios'
let token = localStorage.getItem('token')
const api = axios.create({
    baseURL: 'http://172.30.19.203:1562/api/v0/',
    // baseURL: 'https://rms-test.beeline.uz/api/v0/',
    // baseURL: 'https://rms.beeline.uz/api/v0/',
    headers: {
        common: {
            Authorization: token,
        }
    }
  });
export default api