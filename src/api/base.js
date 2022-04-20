import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8082/',
  timeout: 20000,
  validateStatus(status) {
    return status >= 200 && status < 600;
  },
  withCredentials: true,
});

export default instance;
