import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'

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


render() {
  const { isRegistered, urlBidi,  name, avatarURL } = this.state;
  const {isAuthenticated, user}=this.props
  console.log(user)
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
                  <MDBNavLink to="/">Home</MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink to="/register">Register</MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink to="/login">Login</MDBNavLink>
                </MDBNavItem>
               
              </NavbarNav>
            </MDBCollapse>
          </MDBContainer>
        </MDBNavbar>
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
                 {name}
                <MDBNavItem active>
                  <MDBNavLink to="/">Home</MDBNavLink>
                </MDBNavItem>
                <MDBNavItem active>
                  <MDBNavLink to="/profile">Profile</MDBNavLink>
                </MDBNavItem>               
                <MDBNavItem>
                  <MDBNavLink onClick={this.handleLogout}>Logout</MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                <MDBNavLink to={urlBidi}>Download BIDI Code{name}</MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                <MDBNavLink to={`users/${this.state.user.id}/${this.state.user.securityCode}`}>Public profile</MDBNavLink>
                </MDBNavItem>

              </NavbarNav>
            </MDBCollapse>
          </MDBContainer>
        </MDBNavbar>
      </MDBContainer>
      )}
  
  }
}

export default withAuthConsumer(Navbar);