import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from "axios";
import "./Signup.css";

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      username: "",
      confirm: "",
      error: "",
    };
  }
  
  handleInputValue = (key) => (e) => {
    this.setState({ [key]: e.target.value });
  };

  handleClose = () => {
    this.setState({
      error: "",
    })
    this.props.close();
  }

  handleSignup = () => {
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
    
    if (this.state.password !== this.state.confirm) {
      this.setState({
        error: "패스워드가 틀립니다"
      })
    } else {
      this.setState({ error: "" });
      axios.post("http://ec2-13-209-73-178.ap-northeast-2.compute.amazonaws.com/user/signup", {
        email: this.state.email,
        password: this.state.password,
        username: this.state.username
      })
        .then(() => {
          this.props.handleSignupSuccess();
        })
        .catch(err =>{
          this.setState({
            error: "이미 가입된 이메일입니다"
          })
        })
    }
  }

  render() {
    const { open, close } = this.props;
    return (
      <div>
        {open ? (
          <div className="su-modal">
            <div className="su-signModal">
              <span className="su-close" onClick={this.handleClose}>
                ✖
                    </span>
              <div className="su-modalDefault" >
                <h1>Sign Up</h1>
                <input className="su-sign-info" type="text" placeholder="email" onChange={this.handleInputValue("email")} />
                <input className="su-sign-info" type="password" placeholder="password" onChange={this.handleInputValue("password")} />
                <input className="su-sign-info" type="password" placeholder="confirm password" onChange={this.handleInputValue("confirm")} />
                <input className="su-sign-info" type="text" placeholder="username" onChange={this.handleInputValue("username")} />
                <div className="signBtn" >
                  <div className="sign-up" onClick={this.handleSignup}>회원가입</div>
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
export default Signup;

