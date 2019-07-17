import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import authService from '../../services/AuthService'
import { withAuthConsumer } from '../../contexts/AuthStore';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBModalFooter } from 'mdbreact';

/*eslint no-useless-escape: */

const PASSWORD_PATTERN = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
const EMAIL_PATTERN = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i; 
const logo=require('../../logo.svg')




const validations = {
  email: (value) => {
    let message;
    if (!value) {
      message = 'Email is required';
    } else if (!EMAIL_PATTERN.test(value)) {
      message = 'Invalid email pattern';
    }
    return message;
  },
  password: (value) => {
    let message;
    if (!value) {
      message = 'Password is required'; 
    } else if (!PASSWORD_PATTERN.test(value)) {
      message = "Passwords must contain at least eight characters, including uppercase, lowercase letters and numbers."
    }
    return message;
  },
}

class Login extends Component {
  state = {
    user: {
      email: '',
      password: ''
    },
    errors: {},
    touch: {},
    isAuthenticated: false
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      user: {
        ...this.state.user,
        [name]: value
      },
      errors: {
        ...this.state.errors,
        [name]: validations[name] && validations[name](value)
      }
    })
  }

  handleBlur = (event) => {
    const { name } = event.target;
    this.setState({
      touch: {
        ...this.state.touch,
        [name]: true
      }
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.isValid()) {
      authService.authenticate(this.state.user)
        .then(
          (user) => {
            this.setState({ isAuthenticated: true }, () => {
              this.props.onUserChange(user);
            })
          },
          (error) => {
            const { message, errors } = error.response.data;
            this.setState({
              errors: {
                ...this.state.errors,
                ...errors,
                password: !errors && message
              }
            })
          }
        )
    }
  }

  isValid = () => {
    return !Object.keys(this.state.user)
      .some(attr => this.state.errors[attr])
  }

  render() {
    const { isAuthenticated, errors, user, touch } =  this.state;
    if (isAuthenticated) {
      return (<Redirect to="/profile" />)
    }

    return (
      <MDBContainer >
      <MDBRow>          
        {/* <img src={logo} width="100%" alt="logo" /> */}
        
        <MDBCol md="6">
          <form  
            className="needs-validation"
            noValidate
            id="login-form" 
            onSubmit={this.handleSubmit}
          >
            <p className="h5 text-center mb-4">Log in</p> 
            <div className="grey-text">
              <MDBInput                
                label="Type your email"
                type="email"
                value={user.email}
                onChange={this.handleChange}
                name="email"
                icon="envelope"
                group
                validate={this.isValid}
                error={ errors.email }
                success="right"
                className="form-control"
                // className={`form-control ${touch.email && errors.email ? 'is-invalid' : ''}`}
                 required
                onBlur={this.handleBlur}
                
              />
              <small id="emailHelp" className={` ${touch.email && errors.email ? 'is-invalid' : 'text-muted'}`}>
              { errors.email }
              </small>
              <MDBInput
                label="Type your password"
                type="password"
                value={user.password}
                onChange={this.handleChange} 
                name="password" 
                icon="lock"
                group
                validate={this.isValid}

                error= { errors.password }
                className="form-control"
                // className={`form-control ${touch.password && errors.password ? 'is-invalid' : ''}`} 
                required
                onBlur={this.handleBlur} 
              />
                <small id="passwordHelp" className={` ${touch.password && errors.password ? 'is-invalid' : 'text-muted'}`}>
              { errors.password }
              </small>
            </div>
            <div className="text-center">
            <p className="mt-4"><small></small></p>
            <p className="mb-2"><small>If you signup, you agree with all our terms and conditions where we can do whatever we want with the data!</small></p>
              <MDBBtn color="#3bfe00" className="btn btn-success" form="login-form" type="submit" disabled={!this.isValid()}>Login</MDBBtn>
            </div>
          </form>
          <MDBModalFooter>
                <div className="font-weight-light">
                  <p className="font-small grey-text d-flex  justify-content-center">you don't have an account? <Link to="/register">Create !</Link></p>
                  {/* <p>Forgot Password?</p> */}
                </div>
              </MDBModalFooter>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
     
            // <form id="login-form" className="mt-4" onSubmit={this.handleSubmit}>
          //     <div className="form-group">
          //       <label>Email</label>
          //       <input type="email" name="email" className={`form-control ${touch.email && errors.email ? 'is-invalid' : ''}`} onChange={this.handleChange} onBlur={this.handleBlur} value={user.email} />
          //       <div className="invalid-feedback">{ errors.email }</div>
          //     </div>
              // <div className="form-group">
              //   <label>Password</label>
              //   <input type="password" name="password" className={`form-control ${touch.password && errors.password ? 'is-invalid' : ''}`} onChange={this.handleChange} onBlur={this.handleBlur} value={user.password} />
              //   <div className="invalid-feedback">{ errors.password }</div>
              // </div>
            // </form>
          //   <p className="mt-4"><small>If you don't have an account yet, you can create your account <Link to="/register">here</Link></small></p>
          // // </div>
          // <div className="col-6 pt-4">
          //   <h5>Hello!!</h5>
          //   <p className="lead mb-5">Awesome to hace at IronProfile again!</p>
          //   <p className="mb-2"><small>If you signup, you agree with all our terms and conditions where we can do whatever we want with the data!</small></p>
          //   <button className="btn btn-success" form="login-form" type="submit" disabled={!this.isValid()}> Login</button>
          
    );
  }
}
export default withAuthConsumer(Login)