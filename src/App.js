import React,{Component} from 'react';
import './App.css';
import axios from 'axios'
import {Switch,Route} from "react-router-dom"
import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage'
import NavBar from './containers/NavBar'



export default class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      users: [],
      loading: true
    };
  }

  componentDidMount(){
    axios.get('https://insta.nextacademy.com/api/v1/users')
    .then((result) => {
      this.setState({
        users: result.data,
        loading: false
      })
    })
    .catch((error) =>{
      console.log(error);
    })
  }

  render(){
    const {users} = this.state
    return (
      <>
      <NavBar/>
      <Switch>
        <Route
          exact path="/"
          render =  {props => 
            <HomePage {...props} 
              users={users} 
            />
          }
        />
        <Route
          path="/user/:id"
          render = {props => 
            <ProfilePage 
              {...props} 
              user={users.find(u => u.id === parseInt(props.match.params.id))}
            />
          }
        />
        {/* <Route
         exact path="/profile"
          render = {props =>
            <MyProfilePage
              {...props}
              users={users}
              />
            }
            /> */}
      </Switch>
      </>
    );
  }
}
