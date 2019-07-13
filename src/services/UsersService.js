// import http from './BaseService';
import axios from 'axios';

const http = axios.create({
  baseURL: 'http://localhost:3001',
  withCredentials: false
})


  const getUser = (id1, sC1) => http.get(`/users/${id1}/${sC1}`).then(res => res.data);

export default  getUser


