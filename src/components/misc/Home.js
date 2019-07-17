import React from "react";
// import { Link } from 'react-router-dom'
import { MDBJumbotron, MDBBtn, MDBContainer, MDBRow, MDBCol, MDBIcon, MDBCardBody, MDBNavLink, MDBCardText,  MDBCardTitle } from "mdbreact";

const Home = () => {
  return (
    <MDBContainer className="text-center">
      <MDBRow>
        <MDBCol>
          <MDBJumbotron>
            <MDBCol className="text-white text-center" style={{ backgroundImage: `url(https://mdbootstrap.com/img/Photos/Others/gradient1.jpg)` }}>
              <MDBCardBody>
                <MDBCardTitle className="h2 text-white">
                  Bida 
                </MDBCardTitle>
                <p className="blue-text my-4 font-weight-bold">
                The App that takes care of you              
                </p>
                <MDBCardText className="text-white">
                  Create your profile, share and make visible the Bidi code that provides you. 
                  
                  Easy Fast Help
                </MDBCardText>
                  <hr className="my-4" />
                  <div className="pt-2">
                    <div>
                    <MDBBtn color="primary" className="mr-1">
                      <MDBNavLink className="text-white" to="/register"><MDBIcon icon="user-plus"/> Register</MDBNavLink>
                    </MDBBtn>
                    <MDBBtn outline color="primary" className="ml-1">
                      <MDBNavLink className="text-white" to="/login"><MDBIcon icon="sign-in-alt"/> Login</MDBNavLink>
                    </MDBBtn>
                    </div>
                  </div>
                </MDBCardBody>
              </MDBCol>
          </MDBJumbotron>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  )
}

export default Home;


