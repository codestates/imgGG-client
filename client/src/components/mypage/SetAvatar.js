import React, { Component } from 'react';
import axios from 'axios';  
import {IMGBB_API_KEY} from '../../config/config';

class SetAvatar extends Component {
  state = {
    url: "",
    error: "",
  }

  handleInputValue = (event) => {
    let uploadImage = (img) => {
      let body = new FormData()
      body.set('key', IMGBB_API_KEY)
      body.append('image', img)
  
      return (axios({
        method: 'post',
        url: 'https://api.imgbb.com/1/upload',
        data: body
      }))
    }
    uploadImage(event.target.files[0])
    .then(res => {
      this.setState({
        url: res.data.data.display_url
      })  
  })
  .then(()=>{
    console.log(this.state.url);
  this.handleUpdate()})
}
  handleUpdate = () => {

    axios.post("http://localhost:4000/user/changeprofile",
    {url: this.state.url},
    {withCredentials: true})
  }



  render() {
    return (
      <div className="avatar-upload">
        <h5>프로필 사진 변경</h5>
        <div className="avatar">
          <img src={this.props.info}/>
        </div>
        <div className="btn">
        <input type="file" name="file" accept="image/*" onChange={this.handleInputValue} className="input-btn"></input>
          <button >변경</button>
        </div>
      </div>
    );
  }
}

export default SetAvatar;
