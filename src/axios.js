import axios from 'axios'
const instance = axios.create({
    baseURL: 'http://172.30.19.203:1562/api/v0/',
    // baseURL: 'https://rms-test.beeline.uz/api/v0/',
    // baseURL: 'https://rms.beeline.uz/api/v0/',
  });
export default instance