import React, { Component } from 'react';
import Mainpage from './components/Mainpage';
import Mypage from './components/mypage/Mypage';
import { Route, Switch, Link } from 'react-router-dom';
import Upload from './components/Upload';
import "./App.css";
import Signin from './components/Signin';
import Signup from './components/Signup';
import Imginfo from './components/Imginfo';

class App extends Component {
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
      <div className="App">
        <div className="header">
        <h1 className="logo">ImgGG</h1>
        {!this.state.isLogin ? (
          <div className="menu">
            <div>
              <span onClick={this.openSignin}>로그인</span>
              <Signin open={this.state.signinOpen} close={this.closeSignin} />
            </div>
            <div>
              <span onClick={this.openSignup}>회원가입</span>
              <Signup open={this.state.signupOpen} close={this.closeSignup} />
            </div>
            <div>
              <span>
                <Link to="/upload">업로드</Link>
              </span>
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
        <Route exact path="/" component={Mainpage} />
        <Switch>
          <Route path="/mypage" component={Mypage} />
          <Route path="/upload" component={Upload} />
          <Route path="/info" component={Imginfo} />
          <Route path="/img_detail/:id" component={Imginfo} />
        </Switch>


      </div>
    );
  }
}

export default App;
