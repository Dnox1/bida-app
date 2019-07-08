import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthStore';
import AuthService from '../../services/AuthService';

// eslint-disable-next-line
const URL_PATTERN = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
// eslint-disable-next-line
const EMAIL_PATTERN = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const PASSWORD_PATTERN = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
const PHONE_PATTERN = /^[679]{1}[0-9]{8}$/;
const NIF_NIE_PATTERN = /^[0-9XYZ]{1}[0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKET]{1}$/i;
const SSNUMBER_PATTERN = /^[0-9]{12}$/;
// eslint-disable-next-line
const BIDA_URL_PATTERN = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
 
const validations = {
  email: (value)=> {
    let message;
    if(!value) {
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
  avatarURL: (value) => {
    let message;
    if(!value) {
      message = 'avatarURL is required';
    }
    return message;
  },
  telephone: (value) => {
    let message;
    if(!value) {
      message = 'telephone is required';
    }
    return message;
  },
  name: (value) => {
    let message;
    if(!value) {
      message = 'name is required';
    }
    return message;
  },
  NIF_NIE: (value) => {
    let message;
    if(!value) {
      message = 'URL is required';
    }
    return message;
  },
  ssn: (value) => {
    let message;
    if(!value) {
      message = 'URL is required';
    }
    return message;
  },
  blood: (value) => {
    let message;
    if(!value) {
      message = 'URL is required';
    }
    return message;
  },
  medical: (value) => {
    let message;
    if(!value) {
      message = 'URL is required';
    }
    return message;
  },
  food: (value) => {
    let message;
    if(!value) {
      message = 'URL is required';
    }
    return message;
  },
  ambiental: (value) => {
    let message;
    if(!value) {
      message = 'URL is required';
    }
    return message;
  },
  animal: (value) => {
    let message;
    if(!value) {
      message = 'URL is required';
    }
    return message;
  },
  othersAllergy:(value) => {
    let message;
    if(!value) {
      message = 'URL is required';
    }
    return message;
  },
  securityCode:(value) => {
    let message;
    if(!value) {
      message = 'URL is required';
    }
    return message;
  },

}

export default class Register extends Component {
  state ={
    aAContact: {
      relationship: '',
      contactname: '',
      telephone: ''
    },
    user: {
      email: '',
      password: '',
      avatarURL: '',
      name: '',
      surName: '',
      aAContacts: [],
      personalIdNumber: '',
      ssn: '',
      blood: '',
      medical: '',
      food: '',
      ambiental: '',
      animal: '',
      othersAllergy: '',
      medsINeed: '',
      diseases: '',
      securityCode: '',
    },
    errors: {},
    touch: {},
    isRegistered: false
  }

  isValidAaContacts = () => {
    return !Object.keys(this.state.aAContact)
      .some(attr => this.state.errors[attr])
  }
  
  handleSubmitAddAaContact =(e) => {
    e.preventDefault()
    console.log('in')
    if (this.isValidAaContacts()) {
      this.setState({
        user: {
          ...this.state.user,
          aAContacts: [
            ...this.state.user.aAContacts,
            this.state.aAContact,
          ],
        }
      }, () => console.log(this.state))
      console.log("aac" + this.state.aAContact)
      console.log("aacs" + this.state.aAContact)
    }
  }

  handleChangeAddAaContact = (e) => {
    const { name, value } = e.target;
    this.setState({
      aAContact: {
        ...this.state.aAContact,
        [name]: value
      },
      errors: {
        ...this.state.errors,
        [name]: validations[name] && validations[name](value)
      }
    })
  }

  handleChange = (e) => {
    const { name, value } = e.target;
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

  handleBlur = (e) => {
    const { name } = e.target;
    this.setState({
      touch: {
        ...this.state.touch,
        [name]: true
      }
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.isValid());
      AuthService.register(this.state.user)
        .then(
          (user) => this.setState({ isRegistered: true }),
          (error) => {
            const { message, errors } = error.response.data;
            this.setState({
              errors: {
                ...this.state.errors,
                ...errors,
                email: !errors && message
              }
            })
          }
        )
  }

  isValid = () => {
    return !Object.keys(this.state.user)
      .some(attr => this.state.errors[attr])
  }

  render() {
    const { isRegistered, errors, user, touch, aAContact } = this.state;
    if (isRegistered) {
      return (<Redirect to="/login"/>)
    }

    return (
      <div className="box mx-auto">
        <div className="row">
          <div className="col-12">
            <h1>Sign up</h1>

            <form id="register-form" className="mt-4" >
             
              <div className="shadow p-4 mb-5 bg-white rounded "><h3>Register Data</h3>
                <div className="row">
                  <div className="form-group p-4 col-6">
                    <label>Email</label>
                    <input type="email" name="email" className={`form-control ${touch.email && errors.email ? 'is-invalid' : ''}`} onChange={this.handleChange} onBlur={this.handleBlur} value={user.email} />
                    <div className='invalid-feedback'>{ errors.email}</div>
                  </div>
                  <div className="form-group p-4 col-6">
                    <label>Password</label>
                    <input type="password" name="password" className={`form-control ${touch.password && errors.password ? 'is-invalid' : ''}`} onChange={this.handleChange} onBlur={this.handleBlur} value={user.password} />
                    <div className='invalid-feedback'>{ errors.password}</div>
                  </div>
                </div>
              </div>

              <div className="shadow p-4 mb-5 bg-white rounded "><h3>Personal Data</h3>
                <div className="row">
                  <div className="form-group p-4 col-6">
                    <label>Name</label>
                    <input type="text" name="name" className={`form-control ${touch.name && errors.name ? 'is-invalid' : ''}`} onChange={this.handleChange} onBlur={this.handleBlur} value={user.name} />
                    <div className='invalid-feedback'>{ errors.name}</div>
                  </div>
                  <div className="form-group p-4 col-6">
                    <label>Sur Name</label>
                    <input type="text" name="surName" className={`form-control ${touch.surName && errors.surName ? 'is-invalid' : ''}`} onChange={this.handleChange} onBlur={this.handleBlur} value={user.surName} />
                    <div className='invalid-feedback'>{ errors.surName}</div>
                  </div>
                  <div className="form-group p-4 col-6">
                    <label>personalIdNumber</label>
                    <input type="text" name="personalIdNumber" className={`form-control ${touch.personalIdNumber && errors.personalIdNumber ? 'is-invalid' : ''}`} onChange={this.handleChange} onBlur={this.handleBlur} value={user.personalIdNumber} />
                    <div className='invalid-feedback'>{ errors.personalIdNumber}</div>
                  </div>
                  <div className="form-group p-4 col-6">
                    <label>ssn</label>
                    <input type="number" name="ssn" className={`form-control ${touch.ssn && errors.ssn ? 'is-invalid' : ''}`} onChange={this.handleChange} onBlur={this.handleBlur} value={user.ssn} />
                    <div className='invalid-feedback'>{ errors.ssn}</div>
                  </div>
                  <div className="form-group p-4 col-12">
                    <label>Image Url</label>
                    <input type="url" name="avatarURL" className={`form-control ${touch.avatarURL && errors.avatarURL ? 'is-invalid' : ''}`} onChange={this.handleChange} onBlur={this.handleBlur} value={user.avatarURL} />
                    <div className='invalid-feedback'>{ errors.avatarURL}</div>
                  </div>
                </div>
              </div>
              


              <div className="shadow p-4 mb-5 bg-white rounded "><h3>AA Contacts</h3>
                <div id="AaContact-form" className="mt-4" >
                  <div className="row">

                    <div className="form-group p-2 col-3">
                      <label>relationship</label>
                      <input type="text" name="relationship" className={`form-control ${touch.relationship && errors.relationship ? 'is-invalid' : ''}`} onChange={this.handleChangeAddAaContact} onBlur={this.handleBlur} value={aAContact.relationship} />
                      <div className='invalid-feedback'>{ errors.relationship}</div>
                    </div>
                    <div className="form-group p-2 col-3">
                      <label>contactname</label>
                      <input type="text" name="contactname" className={`form-control ${touch.contactname && errors.contactname ? 'is-invalid' : ''}`} onChange={this.handleChangeAddAaContact} onBlur={this.handleBlur} value={aAContact.contactname} />
                      <div className='invalid-feedback'>{ errors.contactname}</div>
                    </div>
                    <div className="form-group p-2 col-3">
                      <label>Telephone</label>
                      <input type="tel" name="telephone" className={`form-control ${touch.telephone && errors.telephone ? 'is-invalid' : ''}`} onChange={this.handleChangeAddAaContact} onBlur={this.handleBlur} value={aAContact.telephone} />
                      <div className='invalid-feedback'>{ errors.telephone}</div>
                    </div>
                    <div className="form-group p-2 col-3">
                      <label>add</label>
                      <button className="btn btn-success" form="AaContact-form"   onClick={(e) => this.handleSubmitAddAaContact(e)}> Add AaContact</button>
                    </div>
                  </div>
                </div>
              </div>


              <div className="shadow p-4 mb-5 bg-white rounded ">
                <h3>Medical data</h3>
                <p> </p>
                <h4>General</h4>
                <div className="row">
                  <div className="form-group p-2 col-6">
                    <label>blood</label>
                    <input type="text" name="blood" className={`form-control ${touch.blood && errors.blood ? 'is-invalid' : ''}`} onChange={this.handleChange} onBlur={this.handleBlur} value={user.blood} />
                    <div className='invalid-feedback'>{ errors.blood}</div>
                  </div>
                  <div className="form-group p-2 col-6">
                    <label>medsINeed</label>
                    <input type="text" name="medsINeed" className={`form-control ${touch.medsINeed && errors.medsINeed ? 'is-invalid' : ''}`} onChange={this.handleChange} onBlur={this.handleBlur} value={user.medsINeed} />
                    <div className='invalid-feedback'>{ errors.medsINeed }</div>
                  </div>
                  <div className="form-group p-2 col-6">
                    <label>diseases</label>
                    <input type="text" name="diseases" className={`form-control ${touch.diseases && errors.diseases ? 'is-invalid' : ''}`} onChange={this.handleChange} onBlur={this.handleBlur} value={user.diseases} />
                    <div className='invalid-feedback'>{ errors.diseases }</div>
                  </div>                
                </div>
                <h4>Allergies</h4>
                <div className="row">
                  <div className="form-group p-2 col-6">
                    <label>medical</label>
                    <input type="text" name="medical" className={`form-control ${touch.medical && errors.medical ? 'is-invalid' : ''}`} onChange={this.handleChange} onBlur={this.handleBlur} value={user.medical} />
                    <div className='invalid-feedback'>{ errors.medical}</div>
                  </div>
                  <div className="form-group p-2 col-6">
                    <label>food</label>
                    <input type="text" name="food" className={`form-control ${touch.food && errors.food ? 'is-invalid' : ''}`} onChange={this.handleChange} onBlur={this.handleBlur} value={user.food} />
                    <div className='invalid-feedback'>{ errors.food}</div>
                  </div>
                  <div className="form-group p-2 col-6">
                    <label>ambiental</label>
                    <input type="text" name="ambiental" className={`form-control ${touch.ambiental && errors.ambiental ? 'is-invalid' : ''}`} onChange={this.handleChange} onBlur={this.handleBlur} value={user.ambiental} />
                    <div className='invalid-feedback'>{ errors.ambiental}</div>
                  </div>  
                  <div className="form-group p-2 col-6">
                    <label>animal</label>
                    <input type="text" name="animal" className={`form-control ${touch.animal && errors.animal ? 'is-invalid' : ''}`} onChange={this.handleChange} onBlur={this.handleBlur} value={user.animal} />
                    <div className='invalid-feedback'>{ errors.animal}</div>
                  </div>  
                  <div className="form-group p-2 col-12">
                    <label>othersAllergy</label>
                    <input type="text" name="othersAllergy" className={`form-control ${touch.othersAllergy && errors.othersAllergy ? 'is-invalid' : ''}`} onChange={this.handleChange} onBlur={this.handleBlur} value={user.othersAllergy} />
                    <div className='invalid-feedback'>{ errors.othersAllergy}</div>
                  </div>                
                </div>

              </div>
              <div className="col-12 pt-4">
            <h5>Hello!</h5>
            <p className="mb-2"><small>If you signup, you agree with all our terms and conditions where we can do whatever we want with the data!</small></p>
            {/* <button className="btn btn-success" form="register-form" type="submit" disabled={!this.isValid()}> Create the Account</button> */}
          </div>
            </form>

          </div>

        </div>
      </div>
    )
  }
}