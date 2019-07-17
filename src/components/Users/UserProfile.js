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
    console.log(this.state.data)
  }
  
  render() {
    const {data} = this.state
    return (
      <div>
        <div>USER PROFILE</div>
        <div>{data.name}</div>
        <div>{data.surName}</div>
        <div>{data.avatarURL}</div>

        <div>{data.telephone}</div>
        <div>{data.name}</div>
        <div>{this.state.data.NIF_NIE}</div>
        <div>{this.state.data.ssn}</div>
        <div>{this.state.data.blood}</div>
        <div>{data.aAContacts.map((contact, i) => (
            <div key={i}> {contact.name} </div>
          ))}</div>
        <div>{this.state.data.surName}</div>
        <div>{this.state.data.surName}</div>
        <div>{this.state.data.surName}</div>
        <div>{this.state.data.surName}</div>
        <div>{this.state.data.surName}</div>
        <div>{this.state.data.surName}</div>
        <div>{this.state.data.surName}</div>
        <div>{this.state.data.surName}</div>
        <div>{this.state.data.surName}</div>
        <div>{this.state.data.surName}</div>
        <div>{this.state.data.surName}</div>
        <div>{this.state.data.surName}</div>
        <div>{this.state.data.surName}</div>
        <div>{this.state.data.surName}</div>
        <div>{this.state.data.surName}</div>

      </div>
    )
  }

}
export default UserProfile;