import React, { Component } from 'react';
import axios from 'axios';

class SetPassword extends Component {
  state = {
    oldPassword: "",
    newPassword: "",
    confirm: "",
    error: ""
  }

  handleInputValue = (key) => (e) => {
    this.setState({ [key]: e.target.value });
    console.log(this.state);
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
      axios.post("http://localhost:4000/user/changepw", {
        oldPassword: this.state.oldPassword,
        newPassword: this.state.newPassword
      },{withCredentials: true})
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
    console.log('password', this.props.info)
    return (
      <div className="set-password">
        <h5>비밀번호 변경</h5>
        <div>
          <input type="password" placeholder="현재 비밀번호" onChange={this.handleInputValue("oldPassword")}></input>
        </div>
        <div>
          <input type="password" placeholder="새 비밀번호" onChange={this.handleInputValue("newPassword")}></input>
        </div>
        <div>
          <input type="password" placeholder="새 비밀번호 확인" onChange={this.handleInputValue("confirm")}></input>
        </div>
        <div>
          <button onClick={this.handleChangePassword}>변경</button>
          {this.state.error ? <div className="alert-box">{this.state.error}</div> : ''}
        </div>
      </div>
    );
  }
}

export default SetPassword;
