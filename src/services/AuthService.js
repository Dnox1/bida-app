import http from './BaseService';

const register = (user) => http.post('/register', user)
  .then(res => Promise.resolve(res.data));

const authenticate = (user) => http.post('/authenticate', user)
  .then(res => Promise.resolve(res.data));

const getProfile = (user) => http.get('/profile/:id')
.then(res => Promise.resolve(res.data));

const updateProfile = (user) => {
  const data = new FormData();
  console.log(JSON.stringify(user))
  Object.keys(user).forEach(prop => {
    if (prop === 'password' && user.password === '') return
    data.append(prop, user[prop]) 

  });
  console.log(`/profile/${user.id}`)
  console.log(user)
  return http.put(`/profile/${user.id}`, user)
    .then(res => Promise.resolve(res.data));
}

const logout = () => {
  return http.get('/logout')
    .then(res => Promise.resolve(res.data));
}

export default {
  register,
  authenticate,
  getProfile,
  updateProfile,
  logout
  
}