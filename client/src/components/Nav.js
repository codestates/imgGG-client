import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';

class Nav extends Component {
  state = {
    isLogin: false,
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
  render() {
    return (
      <div className="header">
        <h1 className="logo">ImgGG</h1>
        {!this.state.isLogin ? (
          <div className="menu">
            <span onClick={this.handleLogin}>로그인</span>
            <span>회원가입</span>
            <span>
              <Link to="/upload">업로드</Link>
            </span>
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

export default Nav;
