import React,{Component} from 'react';
import { 
  Button, 
  Modal, 
  ModalHeader, 
  ModalBody, 
  ModalFooter,
  Form, 
  FormGroup, 
  Label, 
  Input
  } from 'reactstrap';
import { withRouter } from 'react-router-dom'

import * as EmailValidator from 'email-validator';
import axios from 'axios';

class LoginModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      email:''
    };
  }

  handleEmail = (event) =>{
    this.setState({
      email: event.target.value
    })
  }

  handlePassword = (event) =>{
    this.setState({
      password: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    if (EmailValidator.validate(this.state.email)) {
      axios({
        method: 'post',
        url: 'https://insta.nextacademy.com/api/v1/login',
        header: {"Content-Type": "application/json"} ,
        data: {
          email: this.state.email,
          password: this.state.password
        }
      })
      .then((response)=> {
        let user =  JSON.stringify(response.data.user)
        localStorage.setItem('JWT', response.data.auth_token);
        localStorage.setItem('current_user', user);
        this.props.toggleLoginModal()
        this.props.history.push(`/user/${JSON.parse(localStorage.current_user).id}`)
      });
    }
  }

  render() {
    const{LoginModal,toggleLoginModal,toggleSignUpModal} = this.props
    const{password,email} = this.state
    
    return (
      <>
        <Modal isOpen={LoginModal} toggle={toggleLoginModal}> 
          <ModalHeader toggle={toggleLoginModal}>Login</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                <Label for="Email">Email</Label>
                <Input onChange={this.handleEmail} value={email} type="email" name="email" id="email" placeholder="example@email.com" />
              </FormGroup>
              <FormGroup>
                <Label for="Password">Password</Label>
                <Input onChange={this.handlePassword} value={password} type="password" name="password" id="password" placeholder="password" />
              </FormGroup>
              <Button>Submit</Button>
            </Form>
          </ModalBody>
          <ModalFooter>
            <p onClick={toggleSignUpModal} className="mr-auto">Sign Up Instead ?</p>
          </ModalFooter>
        </Modal>
      </>
       );
      }
    }
    
    export default withRouter(LoginModal)