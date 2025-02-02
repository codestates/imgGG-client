import React from "react";
import { Link, withRouter, Router } from "react-router-dom";
import axios from "axios";
import "./Signin.css";

class Signin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      error: ""
    };
    this.handleInputValue = this.handleInputValue.bind(this);
  }

  handleClose = () => {
    this.setState({
      error: "",
    })
    this.props.close();
  }

  handleInputValue = (key) => (e) => {
    this.setState({ [key]: e.target.value });
  };


  handleLogin = () => {
    if (this.state.email === "" || this.state.password === "") {
      this.setState({
        error: '이메일과 비밀번호를 입력하세요'
      });
    } else {
      this.setState({ error: '' });
      axios.post("http://ec2-13-209-73-178.ap-northeast-2.compute.amazonaws.com/user/signin", {
        email: this.state.email,
        password: this.state.password
      }, {withCredentials: true})
      .then((result)=>{
        this.props.handleResponseSuccess(result.data.token);
      })
      .catch(err => {
        this.setState({
          error: '아이디 또는 비밀번호가 일치하지 않습니다'
        })
      })

    }
  }

  render() {
    const { open, close } = this.props;
    return (
      <div>
        {open ? (
          <div className="modal">
            <div className="signModal">
              <span className="close" onClick={this.handleClose}>
                ✖
              </span>
              <div className="modalDefault" >
                <h1>Sign In</h1>
                <input className="sign-info" type="text" placeholder="email" onChange={this.handleInputValue("email")} />
                <input className="sign-info" type="password" placeholder="password" onChange={this.handleInputValue("password")} />
                <div className="signBtn" >
                  <div className="login" onClick={this.handleLogin}>로그인</div>
                </div>
                {this.state.error ? <div className="alert-box">{this.state.error}</div> : ''}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Signin;
