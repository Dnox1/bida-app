import React from 'react'
import getUser from '../../services/UsersService'
// import { get } from 'https';

function UserProfile() {
  
  const getData = () => {
  getUser() 
    .then(user => console.log(user))
  }

  getData()
  
    return (
      <div>USER PROFILE</div>
    )
  

}
export default UserProfile;