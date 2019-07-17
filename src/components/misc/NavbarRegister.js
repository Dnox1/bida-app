import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'

import { MDBNavbar, MDBNavbarBrand, NavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBContainer }
from 'mdbreact';
import AuthService from '../../services/AuthService';
import { withAuthConsumer } from '../../contexts/AuthStore.js';


const logo=require('../../logo.svg')

// const routes = [
//   {
//     text: 'Home',
//     route: ''
//   },
//   {

//   }
// ]

class NavbarRegister extends Component {
state = {
  user: {
    isRegistered: false  
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

render() {
  const { isRegistered } = this.state;
    if (isRegistered) {
      return (<Redirect to="/login"/>)
    }
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
                <MDBNavLink onClick={this.handleLogout}>Logout</MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBNavLink to="/login">Login</MDBNavLink>
              </MDBNavItem>
            </NavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    </MDBContainer>
    );
  }
}

export default withAuthConsumer(NavbarRegister);