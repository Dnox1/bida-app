import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom'

import { MDBNavbar, MDBNavbarBrand, NavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBContainer }
from 'mdbreact';
import AuthService from '../../services/AuthService';
import { withAuthConsumer } from '../../contexts/AuthStore.js';


const logo=require('../../logo.svg')


class Navbar extends Component {
state = {
  user: {
    urlBidi:'',
    avatarURL:'',
    name:'',
    isRegistered: false,  
    isAuthenticated: false
  },
  collapseID: ''
}

handleLogout = () => {
  AuthService.logout()
    .then(() => this.props.onUserChange(null))
}

toggleCollapse = collapseID => () => {
  this.setState(prevState => ({ collapseID: (prevState.collapseID !== collapseID ? collapseID : '') }));
}

componentDidMount() {
  AuthService.getProfile()
    .then((user) => this.setState({
          user: {
            ...this.state.user, 
            ...user
          }
        }),
    (error) => console.log(error)
    );
  console.log(this.state.user)
}

// addtoMyContacts(e) {
//   e.preventDefault();
//   console.log(this.props.match.params.id)
// }

render() {
  const {isAuthenticated, user}=this.props
  // console.log(user)
  if (!isAuthenticated()) {
    return (
      <MDBContainer>
        <MDBNavbar color="light-blue lighten-4" style={{ marginTop: '20px' }} light>
          <MDBContainer>
            <MDBNavbarBrand>
            <img src={logo} width="100px" alt="logo" />
            </MDBNavbarBrand>
            <MDBNavbarToggler onClick={this.toggleCollapse('navbarCollapse1')} />
            <MDBCollapse id="navbarCollapse1" isOpen={this.state.collapseID} navbar>
              <NavbarNav left>
                <MDBNavItem active>
                  <Link to="/">Home</Link>
                </MDBNavItem>
                <MDBNavItem>
                  <Link to="/register">Register</Link>
                </MDBNavItem>
                <MDBNavItem>
                  <Link to="/login">Login</Link>
                </MDBNavItem>
              </NavbarNav>
            </MDBCollapse>
          </MDBContainer>
        </MDBNavbar>
        <hr/>

      </MDBContainer>
      )}
  else if (isAuthenticated()) {
     
    return (
      <MDBContainer>
        <MDBNavbar color="light-blue lighten-4" style={{ marginTop: '20px' }} light>
          <MDBContainer>
            <MDBNavbarBrand>
            <img src={logo} width="100px" alt="logo" />
            </MDBNavbarBrand>
            <MDBNavbarToggler onClick={this.toggleCollapse('navbarCollapse1')} />
            <MDBCollapse id="navbarCollapse1" isOpen={this.state.collapseID} navbar>
              <NavbarNav left>
                <MDBNavItem active>
                  <p>   
                    {/* <img src={`{user.avatarURL}`} width="100px" alt="logo" />  */}
                    {user.name}
                    {/* {user.avatarURL} */}
                    </p>
                </MDBNavItem>
                
                <MDBNavItem active>
                  <Link to="/">Home</Link>
                </MDBNavItem>
                <MDBNavItem active>
                  <Link to="/profile">My Profile</Link>
                </MDBNavItem>               
                <MDBNavItem>
                  <p onClick={this.handleLogout}>Logout</p>
                </MDBNavItem>
                <MDBNavItem>
                  <a href={`${user.urlBidi}`} download={`bida_${user.name}`}>Download QRCode</a>
                </MDBNavItem>
                <MDBNavItem>
                <Link to={`/users/${user.id}/${user.securityCode}`}>My Public profile</Link>
                </MDBNavItem>
                {/* <MDBNavItem>
                <p onClick={(e) => this.addtoMyContacts(e)}>Add to my contacts</p>
                </MDBNavItem> */}
              </NavbarNav>
            </MDBCollapse>
          </MDBContainer>
        </MDBNavbar>
        <hr/>
      </MDBContainer>
      
      )}
  
  }
}

export default withAuthConsumer(Navbar);