import React, { Component } from 'react';
import axios from 'axios';
import { IMGBB_API_KEY } from '../../config/config';

class SetAvatar extends Component {
  state = {
    url: "",
    view: "",
    error: "",
  }

  componentDidMount = () => {
    this.setState({
      view: this.props.info.userinfo.url,
    })
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
        console.log(res);
        this.setState({
          url: res.data.data.url,
          view: res.data.data.url
        })
        console.log(this.state);
      })
  }

  handleUpdate = () => {
    axios.post("http://localhost:4000/user/changeprofile",
      { url: this.state.url },
      { withCredentials: true })
      .then(() => {
        alert('프로일 이미지가 업데이트 되었습니다.');
      })
  }

  render() {
    console.log(this.props.info);
    return (
      <div className="avatar-upload">
        <h3>프로필 사진 변경</h3>
        <div className="avatar">
          {this.state.view ? <img src={this.state.view} className="avatar-img" alt="img" /> : <div>없음</div>}
        </div>
        <div className="btn">
          <input type="file" name="file" accept="image/*" onChange={this.handleInputValue} className="input-bn"></input>
          <button className="cbtn" disabled={this.state.url ? false : "disabled"} onClick={this.handleUpdate}>변경</button>
        </div>
      </div>
    );
  }
}

export default SetAvatar;
