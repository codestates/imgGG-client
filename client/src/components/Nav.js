import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter, Link } from 'react-router-dom';
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

  handleResponseSuccess = () => {
    this.setState({
      isLogin: true,
    });
    this.props.history.push('/mypage');
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
            <div className="menu-item">
            <span onClick={this.openSignin}>로그인</span>
            <Signin open={this.state.signinOpen} close={this.closeSignin} handleResponseSuccess={this.handleResponseSuccess}/>
            </div>
            <div className="menu-item">
            <span onClick={this.openSignup}>회원가입</span>
            <Signup open={this.state.signupOpen} close={this.closeSignup} />
            </div>
          </div>
        ) : (
          <div className="menu">
            <span onClick={this.handleLogout}>
              <Link to="/">로그아웃</Link>
            </span>
            <span>
              <Link to="/mypage">마이 페이지</Link>
            </span>
            <span>
              <Link to="/upload">업로드</Link>
            </span>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Nav);
