import React, { Component } from 'react';
import axios from 'axios';
import cookie from 'react-cookies';

const token = cookie.load('token');
class SetPassword extends Component {
  state = {
    oldPassword: "",
    newPassword: "",
    confirm: "",
    error: ""
  }

  handleInputValue = (key) => (e) => {
    this.setState({ [key]: e.target.value });
  };

  handleChangePassword = () => {
    this.setState({ error: ""});
    for (let key in this.state) {
      if (key !== 'error' && this.state[key] === "") {
        this.setState({
          error: "모든 항목은 필수입니다"
        })
        return;
      } 
      else {
        this.setState({ error: "" });
      }
    }
    
    if (this.state.newPassword !== this.state.confirm) {
      this.setState({
        error: "변경 패스워드가 틀립니다"
      })
    } else {
      this.setState({ error: "" });
      axios.post("http://ec2-13-209-73-178.ap-northeast-2.compute.amazonaws.com/user/changepw", {
        oldPassword: this.state.oldPassword,
        newPassword: this.state.newPassword
      },{
        headers: {'token': token},
        withCredentials: true})
        .then(() => {
          this.setState({
            error: "패스워드가 변경되었습니다"
          })
        })
        .catch(err =>{
          this.setState({
            error: "현재 패스워드가 틀립니다"
          })
        })
    }
  }

  render() {
    return (
      <div className="set-password">

        <h3>유저 정보</h3>
        <div className="user-inf">
          <div className="user-em-id">이메일:  {this.props.info.userinfo.email}</div>
          <div className="user-em-id">아이디:  {this.props.info.userinfo.username}</div>
        </div>
        <h3>비밀번호 변경</h3>
        <div>
          <input className="pwchange" type="password" placeholder="현재 비밀번호" onChange={this.handleInputValue("oldPassword")}></input>
        </div>
        <div>
          <input className="pwchange" type="password" placeholder="새 비밀번호" onChange={this.handleInputValue("newPassword")}></input>
        </div>
        <div>
          <input className="pwchange" type="password" placeholder="새 비밀번호 확인" onChange={this.handleInputValue("confirm")}></input>
        </div>
        <div>
          <button className="change" onClick={this.handleChangePassword}>변경</button>
          {this.state.error ? <div className="alert-box">{this.state.error}</div> : ''}
        </div>
      </div>
    );
  }
}

export default SetPassword;
