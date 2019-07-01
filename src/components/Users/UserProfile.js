import React from 'react'
import getUser from '../../services/UsersService'
import { get } from 'https';

function UserProfile() {
  
  const getData = () => {
  getUser() 
    .then(user => console.log(user))
  }

  getData()
  
    return (
      <div>p</div>
    )
  

}
export default UserProfile;