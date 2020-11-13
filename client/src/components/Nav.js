import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';
import Signin from './Signin';
import Signup from './Signup';

class Nav extends Component {
  state = {
    isLogin: false,
    userinfo: null,
    signinOpen: false,
    signupOpen: false,
  };

  handleLogin = () => {
    this.setState({
      isLogin: true,
    });
  };

  handleLogout = () => {
    this.setState({
      isLogin: false,
    });
  };

  openSignin = () => {
    this.setState({ signinOpen: true });
  };
  closeSignin = () => {
    this.setState({ signinOpen: false });
  };
  openSignup = () => {
    this.setState({ signupOpen: true });
  };
  closeSignup = () => {
    this.setState({ signupOpen: false });
  };

  render() {
    return (
      <div className="header">
        <h1 className="logo">ImgGG</h1>
        {!this.state.isLogin ? (
          <div className="menu">
            <span onClick={this.openSignin}>로그인</span>
            <Signin open={this.state.signinOpen} close={this.closeSignin} />
            <span onClick={this.openSignup}>회원가입</span>
            <Signup open={this.state.signupOpen} close={this.closeSignup} />
          </div>
        ) : (
          <div className="menu">
            <span onClick={this.handleLogout}>
              <Link to="/">로그아웃</Link>
            </span>
            <span>
              <Link to="/mypage">마이 페이지</Link>
            </span>
            <span>업로드</span>
          </div>
        )}
      </div>
    );
  }
}

export default Nav;
