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

  handleInputValue = (key) => (e) => {
    this.setState({ [key]: e.target.value });
    console.log(this.state);
  };

  render() {
    const { open, close } = this.props;
    return (
      <div>
        {open ? (
          <div className="modal">
            <div className="signModal">
              <span className="close" onClick={close}>
                  ✖
                    </span>
              <div className="modalDefault" onClick={open}>
                <h1>Sign In</h1>
                <input className="sign-info" type="text" placeholder="email" onChange={this.handleInputValue("email")} />
                <input className="sign-info" type="password" placeholder="password" onChange={this.handleInputValue("password")}/>
                <Link to='/mypage' className="signBtn" >
                  <div className="login" >로그인</div>
                </Link>
              </div>
              <div className="modalSocial">
                <h1>Sign In With</h1>
                <button className="facebookBtn" >
                  facebook
                        </button>
                <button className="googleBtn" >
                  Google
                        </button>
                <button className="twitterBtn" >
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

export default Signin;