import React,{Component} from 'react';
import UserImages from '../containers/UserImages'
import { Container, Row, Col } from 'reactstrap';
import Image from "react-graceful-image";
import {Link} from 'react-router-dom'

export default class HomePage extends Component {
  constructor(props){
    super(props)
    this.state = {};
  }

  render(){
    const {users} = this.props;
    return (
      <>
        <Container fluid>
          {users.map(user =>(
              <Row 
              key={user.id}
              style = {{
                marginBottom:"20px",
                backgroundColor: "#f0f0f0",
                padding:"20px"
              }}>
                <Col sm="3">
                <Link to={`/users/${user.id}`}>
                  <Image 
                    src={user.profileImage} 
                    width="200px" 
                    style= {{  border:"6px solid grey", borderRadius: "50%"}}
                    alt=""
                  />
                  </Link>
                  <Link to={`/user/${user.id}`}>
                  <p>{user.username}</p>
                  </Link>
                </Col>
                <Col sm="8">
                  <UserImages user_id={user.id}/>
                </Col>
              </Row>  
            )
          )
        }
        </Container>
      </>
    )
  }
}