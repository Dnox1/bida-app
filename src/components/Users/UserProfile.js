import React, { Component} from 'react'
import getUser from '../../services/UsersService'

// import { get } from 'https';

class UserProfile extends Component{
  
  state = {
    data: {},
  }

   componentDidMount() {
    getUser(this.props.match.params.id, this.props.match.params.securityCode) 
    .then(data => this.setState({data}))
  }
  
  render() {
    
    return (
      <div>
        <div>USER PROFILE</div>
        <div>{this.state.data.name}</div>
      </div>
    )
  }

}
export default UserProfile;