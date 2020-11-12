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
    this.handleInputValue = this.handleInputValue.bind(this);
  }
  handleInputValue = (key) => (e) => {
    this.setState({ [key]: e.target.value });
    console.log(this.state);
  };

  render() {
    const { open, close } = this.props;
    return (
      <div>
        {open ? (
          <div className="su-modal">
            <div className="su-signModal">
              <span className="su-close" onClick={close}>
                ✖
                    </span>
              <div className="su-modalDefault" onClick={open}>
                <h1>Sign Up</h1>
                <input className="su-sign-info" type="text" placeholder="email" onChange={this.handleInputValue("email")}/>
                <input className="su-sign-info" type="password" placeholder="password" onChange={this.handleInputValue("password")}/>
                <input className="su-sign-info" type="text" placeholder="confirm password" onChange={this.handleInputValue("confirm")}/>
                <input className="su-sign-info" type="text" placeholder="username" onChange={this.handleInputValue("username")}/>
                <Link to='/' className="signBtn" >
                  <div className="sign-up" >회원가입</div>
                </Link>
              </div>
              <div className="su-modalSocial">
                <h1>Sign Up With</h1>
                <button className="su-facebookBtn" >
                  facebook
                        </button>
                <button className="su-googleBtn" >
                  Google
                        </button>
                <button className="su-twitterBtn" >
                  Twitter
                        </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Signup;