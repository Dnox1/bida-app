import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { Tag, Input, Tooltip, Icon, Select, TapBar } from 'antd';


// import { AuthContext } from '../../contexts/AuthStore';
import AuthService from '../../services/AuthService';
import blood from '../../data/blood.json';
import medical from '../../data/medical.json';
import food from '../../data/food.json';
import ambiental from '../../data/ambiental.json';
import animal from '../../data/animal.json';
import { withAuthConsumer } from '../../contexts/AuthStore.js';
import QRCode from 'qrcode';

var canvas = document.getElementById('canvas')

// eslint-disable-next-line
// const URL_PATTERN = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
// eslint-disable-next-line
const EMAIL_PATTERN = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const PASSWORD_PATTERN = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
const PHONE_PATTERN = /^[679]{1}[0-9]{8}$/;
const NIF_NIE_PATTERN = /^[0-9XYZ]{1}[0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKET]{1}$/i;
const SSNUMBER_PATTERN = /^[0-9]{12}$/;
// eslint-disable-next-line
// const BIDA_URL_PATTERN = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

const { CheckableTag } = Tag;
const { Option } = Select;

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
 
  telephone: (value) => {
    let message;
    if(!value) {
      message = 'telephone is required';
     }else if (!PHONE_PATTERN.test(value)) {
      message = "telephonr must contain nine numbers, begining in 6, 7 or 9"
    }
    return message;
  },
  name: (value) => {
    let message;
    if(!value) {
      message = 'name is required';
    } else if (value.length <= 3 ) {
      message = 'name must contain at least three caracters'
    }
    return message;
  },
  personalIdNumber: (value) => {
    let message;
    if(!value) {
      message = 'URL is required';
    } else if (!NIF_NIE_PATTERN.test(value)) {
      message = 'Document Number Pattern is invalid'
    }
    return message;
  },
  ssn: (value) => {
    let message;
    if(!value) {
      message = 'URL is required';
    } else if (!SSNUMBER_PATTERN.test(value)) {
      message = 'SSNumber is invalid'
    }
    return message;
  },
  aAContacts:(value) => {
    let message;
    if(!value) {
      message = 'Add at least a Contact for advise';
    }
    return message;
  },
  relationship: (value) => {
    let message;
    if(!value) {
      message = 'name is required';
    } else if (value.length <= 3 ) {
      message = 'name must contain at least three caracters'
    }
    return message;
  },
  contactname: (value) => {
    let message;
    if(!value) {
      message = 'name is required';
    } else if (value.length <= 3 ) {
      message = 'name must contain at least three caracters'
    }
    return message;
  },
  contactTelephone: (value) => {
    let message;
    if(!value) {
      message = 'telephone is required';
     }else if (!PHONE_PATTERN.test(value)) {
      message = "telephonr must contain nine numbers, begining in 6, 7 or 9"
    }
    return message;
  },
}



class Profile extends Component {
  state ={
    aAContact: {
      relationship: '',
      contactname: '',
      contactTelephone: ['']
    },
    user: {
      email: '',
      password: '',
      // avatarURL: '',
      name: '',
      surName: '',
      aAContacts: [],
      personalIdNumber: '',
      ssn: '',
      blood: [],
      medical: [],
      food: [],
      ambiental: [],
      animal: [],
      othersAllergy: [],
      medsINeed: [],
      diseases: [],
      urlBidi:'',
      securityCode: '',
    },
    errors: {},
    touch: {},
    isRegistered: false,
    checked: true,
    tags: [],
    inputVisible: false,
    inputValue: '',
    selectedTab: 'redTab',
    hidden: false,
    fullScreen: false,
  }

  // FUNCTIONS FOR QR GENERATOR

//  getQr = () => {
//   const { profileUrl } = this.state.user;
//   if (profileUrl) {
//   QRCode.toDataURL(profileUrl)
//     .then(url => {
//       console.log(url)
//     })
//     .catch(err => {
//       console.error(err)
//     })
//   }
// }
  
// FUNCTIONS FOR ANT DESIGN

 

  handleChangeSelect = (value) => {
    this.setState({
      user: {
        ...this.state.user,
        blood: value
      },
      
      errors: {
        ...this.state.errors,
        [blood]: validations[blood] && validations[blood](value)
      }
    })
    console.log(`selected ${value}`);
    console.log(`state ${this.state.user.blood}`);


  }

  handleChecked = (checked, item, property) => {
    if (checked) {
      this.setState({ user: {
        ...this.state.user,
        [property]: [...this.state.user[property], item]
      } })
    } else {
      this.setState({ user: {
        ...this.state.user,
        [property]: this.state.user[property].filter(x => x !== item)
      }})
    }
  };

  handleClose = removedTag => {
    const tags = this.state.tags.filter(tag => tag !== removedTag);
    console.log(tags);
    this.setState({ tags });
  };

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  };

  handleInputChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  handleInputConfirm = () => {
    const { inputValue } = this.state;
    let { tags } = this.state;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }
    console.log(tags);
    this.setState({
      user: {
        ...this.state.user,
        othersAllergy: [...tags]
      },
      tags,
      inputVisible: false,
      inputValue: '',

    });
  };
  saveInputRef = input => (this.input = input);

  //FUNCTIONS FOR AACONTACTS FORM

  isValidAaContacts = () => {
    return !Object.keys(this.state.aAContact)
      .some(attr => this.state.errors[attr])
  }

  handleSubmitAddAaContact =(e) => {
    e.preventDefault()
    if (this.isValidAaContacts()) {
      this.setState({
        user: {
          ...this.state.user,
          aAContacts: [
            ...this.state.user.aAContacts,
            this.state.aAContact,
          ],
        }
      })
      console.log("aac" + this.state.aAContact)
      console.log(this.state.user)
    }
  }

  handleSubmitRemoveAaContact =(e, i) => {
    e.preventDefault()
    const newContact = this.state.user.aAContacts.filter((c) => {
      return c.contactTelephone !== i
    })    
    this.setState({
      user: {
        ...this.state.user,
        aAContacts: newContact
      }
    })
    console.log(i);
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


  // FUNCTIONS FOR FORM

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

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.isValid()) {
      console.log(this.state.user);
      AuthService.updateProfile(this.state.user)
        .then(
          (user) => this.setState({ user: {...this.state.user, ...user } }),
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
  }

  isValid = () => {
    return !Object.keys(this.state.user)
      .some(attr => this.state.errors[attr])
  }

  handleLogout = () => {
    AuthService.logout()
      .then(() => this.props.onUserChange(null))
  }

  componentDidMount() {
    AuthService.getProfile()
      .then(
        (user) => {
          this.setState({
            user: {
              ...this.state.user, 
              ...user
            }
          })
          
          QRCode.toCanvas(
            document.getElementById('canvas'),
            `http://localhost:3000/users/${user.id}/${user.securityCode}`,
            { 
              errorCorrectionLevel: 'H',
              color: {
                dark: '#3bfe00',  // Blue dots
                light: '#0000' // Transparent background
              }
            },
            function (error) {}
            )
         

          QRCode.toDataURL(
            `http://localhost:3000/users/${user.id}/${user.securityCode}`,
            { 
              errorCorrectionLevel: 'H',
              type: 'image/jpeg',
              color: {
                dark: '#3bfe00',  // Blue dots
                light: '#0000' // Transparent background
              }
            })
            .then(url => this.setState({ 
              user: {
              ...this.state.user, 
              urlBidi: url } }))
            .catch(err => console.error(err))

 
    })
  }

  renderContent(pageText) {
    return (
      <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>
        <div style={{ paddingTop: 60 }}>Clicked “{pageText}” tab， show “{pageText}” information</div>
        <a style={{ display: 'block', marginTop: 40, marginBottom: 20, color: '#108ee9' }}
          onClick={(e) => {
            e.preventDefault();
            this.setState({
              hidden: !this.state.hidden,
            });
          }}
        >
          Click to show/hide tab-bar
        </a>
        <a style={{ display: 'block', marginBottom: 600, color: '#108ee9' }}
          onClick={(e) => {
            e.preventDefault();
            this.setState({
              fullScreen: !this.state.fullScreen,
            });
          }}
        >
          Click to switch fullscreen
        </a>
      </div>
    );
  }


  render() {
    const { isRegistered, errors, user, touch, aAContact, tags, inputVisible, inputValue } = this.state;
    if (isRegistered) {
      return (<Redirect to="/login"/>)
    }

    return (
      
      <div className="box mx-auto">
        <div className="row">
          <div className="col-12">
            <hr/>
            <canvas id="canvas"></canvas>
          <div className="col-12">
          <a href={`whatsapp://send?text=http://localhost:3000/users/${user.id}/${user.securityCode}`} data-action="share/whatsapp/share">Enviar por WhatsApp</a>

            
            <a href="whatsapp://send?text=texto">Compartir por whatsapp</a> 

            <a href={`whatsapp://send?text=http://localhost:3000/users/${user.id}/${user.securityCode}`}>Compartir por whatsapp</a> 
          </div>
            <a href={`${user.urlBidi}`} download={`bida_${user.name}`}>Download QRCode</a>
          </div>
        </div>
        <div className="row">     
          <div className="col-12">
            <h1>Profile</h1>
            <form id="update-form" className="mt-4" onSubmit={this.handleSubmit} >
              <div className="shadow p-4 mb-5 bg-white rounded "><h3>Register Data</h3>
                <div className="row">
                  <div className="form-group p-4 col-12">
                    <div className="p-4 col-12"> 
                      <label>Email</label>
                      <input type="email" name="email" className={`form-control ${touch.email && errors.email ? 'is-invalid' : ''}`} onChange={this.handleChange} onBlur={this.handleBlur} value={user.email} />
                      <div className='invalid-feedback'>{ errors.email}</div>
                    </div>
                    <div className="p-4 col-12">
                      <label>Password</label>
                      <input type="password" name="password" className={`form-control ${touch.password && errors.password ? 'is-invalid' : ''}`} onChange={this.handleChange} onBlur={this.handleBlur} value={user.password} />
                      <div className='invalid-feedback'>{ errors.password}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="shadow p-4 mb-5 bg-white rounded "><h3>Personal Data</h3>
                <div className="row">
                  <div className="form-group p-4 col-12">
                    <label>Name</label>
                    <input type="text" name="name" className={`form-control ${touch.name && errors.name ? 'is-invalid' : ''}`} onChange={this.handleChange} onBlur={this.handleBlur} value={user.name} />
                    <div className='invalid-feedback'>{ errors.name}</div>
                  </div>
                  <div className="form-group p-4 col-12">
                    <label>Sur Name</label>
                    <input type="text" name="surName" className={`form-control ${touch.surName && errors.surName ? 'is-invalid' : ''}`} onChange={this.handleChange} onBlur={this.handleBlur} value={user.surName} />
                    <div className='invalid-feedback'>{ errors.surName}</div>
                  </div>
                  <div className="form-group p-4 col-12">
                    <label>personalIdNumber</label>
                    <input type="text" name="personalIdNumber" className={`form-control ${touch.personalIdNumber && errors.personalIdNumber ? 'is-invalid' : ''}`} onChange={this.handleChange} onBlur={this.handleBlur} value={user.personalIdNumber} />
                    <div className='invalid-feedback'>{ errors.personalIdNumber}</div>
                  </div>
                  <div className="form-group p-4 col-12">
                    <label>ssn</label>
                    <input type="number" name="ssn" className={`form-control ${touch.ssn && errors.ssn ? 'is-invalid' : ''}`} onChange={this.handleChange} onBlur={this.handleBlur} value={user.ssn} />
                    <div className='invalid-feedback'>{ errors.ssn}</div>
                  </div>
                  {/* <div className="form-group p-4 col-12">
                    <label>Image Url</label>
                    <input type="url" name="avatarURL" className={`form-control ${touch.avatarURL && errors.avatarURL ? 'is-invalid' : ''}`} onChange={this.handleChange} onBlur={this.handleBlur} value={user.avatarURL} />
                    <div className='invalid-feedback'>{ errors.avatarURL}</div>
                  </div> */}
                </div>
              </div>
              <div className="shadow p-4 mb-5 bg-white rounded "><h3>AA Contacts</h3>
                <div id="AaContact-form" className="mt-4" >
                  <div className="row">
                    <div className="form-group p-2 col-6">
                      <label>relationship</label>
                      <input type="text" name="relationship" className={`form-control ${touch.relationship && errors.relationship ? 'is-invalid' : ''}`} onChange={this.handleChangeAddAaContact} onBlur={this.handleBlur} value={aAContact.relationship} />
                      <div className='invalid-feedback'>{ errors.relationship}</div>
                    </div>
                    <div className="form-group p-2 col-6">
                      <label>contactname</label>
                      <input type="text" name="contactname" className={`form-control ${touch.contactname && errors.contactname ? 'is-invalid' : ''}`} onChange={this.handleChangeAddAaContact} onBlur={this.handleBlur} value={aAContact.contactname} />
                      <div className='invalid-feedback'>{ errors.contactname}</div>
                    </div>
                    <div className="form-group p-2 col-6">
                      <label>Telephone</label>
                      <input type="tel" name="contactTelephone" className={`form-control ${touch.contactTelephone && errors.contactTelephone ? 'is-invalid' : ''}`} onChange={this.handleChangeAddAaContact} onBlur={this.handleBlur} value={aAContact.contactTelephone} />
                      <div className='invalid-feedback'>{ errors.contactTelephone}</div>
                    </div>
                    <div className="form-group p-2 col-3">
                      <label> + </label>
                      <button className="btn btn-success" form="AaContact-form"   onClick={(e) => this.handleSubmitAddAaContact(e)}> + </button>
                    </div>
                  </div>
                </div>
                  <div> { user.aAContacts && user.aAContacts.map((contact, i) => ( 
                    <p key= {i} > {contact.relationship} {contact.contactname} {contact.contactTelephone} 
                    <button className="btn btn-danger" onClick={(e) => this.handleSubmitRemoveAaContact(e, contact.contactTelephone)} > - </button> </p>
                    ))} 
                  </div>
                  <div className='invalid-feedback'>{ errors.aAContacts}</div>
                </div>
              <div className="shadow p-4 mb-5 bg-white rounded ">
                  <h3>Medical data</h3>
                  <h4>General</h4>
                <div className="row">                                 
                  <div className="form-group p-2 col-12">
                    <label>blood</label>
                  <div>
                    <Select defaultValue={'Select your type of blood'}  onChange={this.handleChangeSelect}  name="blood" value={user.blood}>
                      <Option value="A+">A+</Option>
                      <Option value="A-">A-</Option>
                      <Option value="B+">B+</Option>
                      <Option value="B-">B-</Option>
                      <Option value="AB+">AB+</Option>
                      <Option value="AB-">AB-</Option>
                      <Option value="0+">0+</Option>
                      <Option value="0-">0-</Option>
                    </Select>
                  </div>
                  <div className='invalid-feedback'>{ errors.blood }</div>
                </div>
                  <div className="form-group p-2 col-12">
                    <label>medsINeed</label>
                    <input type="text" name="medsINeed" className={`form-control ${touch.medsINeed && errors.medsINeed ? 'is-invalid' : ''}`} onChange={this.handleChange} onBlur={this.handleBlur} value={user.medsINeed} />
                    <div className='invalid-feedback'>{ errors.medsINeed }</div>
                  </div>
                  <div className="form-group p-2 col-12">
                    <label>diseases</label>
                    <input type="text" name="diseases" className={`form-control ${touch.diseases && errors.diseases ? 'is-invalid' : ''}`} onChange={this.handleChange} onBlur={this.handleBlur} value={user.diseases} />
                    <div className='invalid-feedback'>{ errors.diseases }</div>
                  </div>                
                </div>
                <h4>Allergies</h4>
                <div className="row">
                  <div className="form-group p-2 col-12">
                    <label>medical</label>
                    <div>
                      {medical.map((option, i) => (
                        <CheckableTag key={i} checked={user.medical.includes(option)} onChange={checked => { this.handleChecked(checked, option, 'medical') }}>
                          {option}
                        </CheckableTag>
                      ))}
                    </div>
                  </div>
                  <div className="form-group p-2 col-12">
                    <label>Food</label>
                    <div>
                      {food.map((option, i) => (
                        <CheckableTag key={i} checked={user.food.includes(option)} onChange={checked => { this.handleChecked(checked, option, 'food') }}>
                          {option}
                        </CheckableTag>
                      ))}
                    </div>
                  </div>
                  <div className="form-group p-2 col-12">
                    <label>Ambiental</label>
                    <div>
                      {ambiental.map((option, i) => (
                        <CheckableTag key={i} checked={user.ambiental.includes(option)} onChange={checked => { this.handleChecked(checked, option, 'ambiental') }}>
                          {option}
                        </CheckableTag>
                      ))}
                    </div>
                  </div>
                  <div className="form-group p-2 col-12">
                    <label>Animal</label>
                    <div>
                      {animal.map((option, i) => (
                        <CheckableTag key={i} checked={user.animal.includes(option)} onChange={checked => { this.handleChecked(checked, option, 'animal') }}>
                          {option}
                        </CheckableTag>
                      ))}
                    </div>
                  </div>
                  <div className="form-group p-2 col-12">
                    <label>othersAllergy</label>
                      <div>
                        {tags.map((tag, index) => {
                          const isLongTag = tag.length > 20;
                          const tagElem = (
                            <Tag key={tag} closable={index !== 0} onClose={() => this.handleClose(tag)}>
                              {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                            </Tag>
                          );
                          return isLongTag ? (
                            <Tooltip title={tag} key={tag}>
                              {tagElem}
                            </Tooltip>
                          ) : (
                            tagElem
                          );
                        })}
                        {inputVisible && (
                          <Input
                            ref={this.saveInputRef}
                            type="text"
                            size="small"
                            style={{ width: 78 }}
                            value={inputValue}
                            onChange={this.handleInputChange}
                            onBlur={this.handleInputConfirm}
                            onPressEnter={this.handleInputConfirm}
                          />
                        )}
                        {!inputVisible && (
                          <Tag onClick={this.showInput} value={user.othersAllergy} name="othersAllergy" style={{ background: '#fff', borderStyle: 'dashed' }}>
                            <Icon type="plus" /> Add Allergy
                          </Tag>
                        )}
                        </div>
                      <div className='invalid-feedback'>{ errors.othersAllergy}</div>
                  </div>    
                </div>
              </div>
              <div className="col-12 pt-4">
                <button className="btn btn-success" form="update-form" type="submit" disabled={!this.isValid()}>Update</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      
    );
  }
}

export default withAuthConsumer(Profile)