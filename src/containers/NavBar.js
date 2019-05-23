import React,{Component} from 'react';
import {
  Collapse,
  Button,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  } from 'reactstrap';

import {Link} from 'react-router-dom'

import LoginModal from './LoginModal'
import SignUpModal from './SignUpModal'


export default class NavBar extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      LoginModal: false,
      SignUpModal: false,
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  toggleLoginModal =()=> {
    this.setState(prevState => ({
      SignUpModal: false,
      LoginModal: !prevState.LoginModal
    }));
  }

  toggleSignUpModal =()=> {
    this.setState(prevState => ({
      LoginModal: false,
      SignUpModal: !prevState.signUpModal
    }));
  }

  handleLogout = () => {
    localStorage.removeItem('JWT');
    localStorage.removeItem('current_user');
    this.forceUpdate()
  }

  render() {
    return (
      <>
        <Navbar color="light" light expand="md">
          <Link to='/' className="navbar-brand">Nextagram</Link>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>

                <Button>
                {
                  localStorage.JWT
                  ? null
                  : <Button onClick={this.toggleLoginModal}>
                      Login
                    </Button>
                }
                 {
                  localStorage.JWT
                  ? null
                  : <Button onClick={this.toggleSignUpModal}>
                      Sign Up
                    </Button>
                }
                {
                  localStorage.JWT
                  ? <Button onClick={this.handleLogout} href='/'>  
                      Logout
                    </Button>
                  : null
                }
                {
                  localStorage.JWT ? 
                  <Button
                  href = {`/user/${JSON.parse(localStorage.current_user).id}`} >MyProfilePage
                    </Button> 
                    : null 
                  }
                
                  </Button>
                
                  
              
            </Nav>
          </Collapse>
        </Navbar>
        <LoginModal LoginModal={this.state.LoginModal} toggleLoginModal={this.toggleLoginModal} toggleSignUpModal={this.toggleSignUpModal}/>
        <SignUpModal SignUpModal={this.state.SignUpModal} toggleSignUpModal={this.toggleSignUpModal} toggleLoginModal={this.toggleLoginModal}/>
      </>
    );
  }
}