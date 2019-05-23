import React,{Component} from 'react';
import axios from 'axios';
import Image from "react-graceful-image";

export default class MyProfilePage extends Component {
  constructor(props){
    super(props);
    this.state = {
      images: []
    };
  }

  componentDidMount(){
    axios.get(`https://insta.nextacademy.com/api/v1/images/me=${this.props.user_id}`)
    .then((result) => {
      
      console.log(result);
      this.setState({
        images: result.data
      });
    })
    .catch((error) =>{
      
      console.log(error);
    })
  }

  render(){
    const {images} = this.state;
    return (
      <>
        {images.map(image => (
            <Image 
              src={image} 
              width="250px"
              height="200px"
              style={{margin: "10px"}} 
              alt=""
            />
          ))}
         </>
    );
  }
}