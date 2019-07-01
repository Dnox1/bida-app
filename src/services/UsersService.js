// import http from './BaseService';
import axios from 'axios';

const http = axios.create({
  baseURL: 'http://localhost:3001',
  withCredentials: false
})


const id1 = '5d1742750f4828494a9b5fd1'
const sC1 = '123456'

const getUser = (user) => http.get(`/users/${id1}/${sC1}`)
  .then(res => res.data);

export default  getUser


