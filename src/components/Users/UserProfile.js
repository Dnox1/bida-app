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
  
  addtoMyContacts(e) {
    e.preventDefault();
    console.log(this.props.match.params.id)
  }

  render() {
    const {data} = this.state
    const {isAuthenticated}=this.props
    // console.log(user)
    if (!isAuthenticated) {
      console.log("authenticated")
    }
    return (
      <div>
        <h1>User Profile</h1>
        <h3>Personal Data</h3>
        <div>{data.name} {data.surName}</div>
        {/* <div>{data.avatarURL}</div> */}

        <div>{data.personalIdNumber}</div>
        <div>{this.state.data.ssn}</div>
        
        <h3>Advice this Contacts</h3>
        <div> { data.aAContacts && data.aAContacts.map((contact, i) => ( 
          <p key= {i} > {contact.relationship} {contact.contactname} {contact.contactTelephone} </p> ))} 
        </div>
        
        <h3>Medical Data</h3>
        <div>{data.blood}</div>
        <h4>Medical Allergies</h4>
          <div> { data.medical && data.medical.map((tag, i) => ( <p key= {i} > {tag} </p> ))} </div>
        <h4>Food Allergies</h4>
           <div> { data.food && data.food.map((tag, i) => ( <p key= {i} > {tag} </p> ))} </div>
        <h4>Ambiental Allergies</h4>
          <div> { data.ambiental && data.ambiental.map((tag, i) => ( <p key= {i} > {tag} </p> ))} </div>
        <h4>Animal Allergies</h4>
          <div> { data.animal && data.animal.map((tag, i) => ( <p key= {i} > {tag} </p> ))} </div>
        <h4>Others Allergies</h4>
          <div> { data.othersAllergy && data.othersAllergy.map((tag, i) => ( <p key= {i} > {tag} </p> ))} </div>
        <h4>Meds I Need</h4>
        <div>{data.medsINeed}</div>
        <h4>Diseases</h4> 
        <div>{data.medsINeed}</div>
        <div> <p onClick={(e) => this.addtoMyContacts(e)}>Add to my contacts</p> </div>
    </div>
  )
}
}
export default UserProfile;