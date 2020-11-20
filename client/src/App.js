import React, { Component } from 'react';
import Mypage from './components/mypage/Mypage';
import { Route, Switch, Link, withRouter } from 'react-router-dom';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Upload from './components/Upload';
import Imginfo from './components/Imginfo';
import './App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import ImgList from './components/ImgList';
const token = cookie.load('token');

class App extends Component {
  state = {
    isLogin: false,
    userinfo: null,
    signinOpen: false,
    signupOpen: false,
  };

  componentDidMount = () => {
    
    if(token) {
      axios.get('http://ec2-13-209-73-178.ap-northeast-2.compute.amazonaws.com/user/info', 
      { headers: {'token': token}, 
      withCredentials: true }
      )
      .then((result)=>{
          this.setState({
          isLogin: true,
          userinfo: result.data
        })
      })
    }
  }

  handleResponseSuccess = (token) => {
    cookie.save('token',token);
    axios.get('http://ec2-13-209-73-178.ap-northeast-2.compute.amazonaws.com/user/info',
      { 
        headers: {'token': token}, 
        withCredentials: true 
      }
    )
    .then((result) => {
      this.setState({
        isLogin: true, 
        signinOpen: false,
        userinfo: result.data
      });
      window.location.reload();
    }) 
  };

  handleSignupSuccess = () => {
    this.setState({
      signupOpen: false,
    });
  }

  handleLogout = () => {
    cookie.remove('token');
    window.location.reload("/");
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
          <h1 className="logo" onClick={()=>{(window.location.reload())}}>
            <Link to="/">ImgGG</Link>
          </h1>
          {!this.state.isLogin ? (
            <div className="menu">
              <div className="menu-item">
                <div onClick={this.openSignup} >회원가입</div>
                <Signup open={this.state.signupOpen} close={this.closeSignup} handleSignupSuccess={this.handleSignupSuccess}/>
              </div>
              <div className="menu-item">
                <div onClick={this.openSignin}>로그인</div>
                <Signin open={this.state.signinOpen} close={this.closeSignin} handleResponseSuccess={this.handleResponseSuccess} />
              </div>
            </div>
          ) : (
              <div className="menu">
                <div className="menu-item" onClick={()=>{(window.location.reload('/mypage'))}} >
                  <Link to={{
                    pathname: "/mypage",
                    state : {
                     userinfo: this.state.userinfo
                    },
                  }}>마이 페이지</Link>
                </div>
                <div className="menu-item" onClick={this.handleLogout}>
                  <Link to="/">로그아웃</Link>
                </div>
                <div className="menu-item" onClick={()=>{(window.location.reload('/upload'))}}>
                  <Link to={{pathname:"/upload", state: {userinfo: this.state.userinfo}}}>업로드</Link>
                </div>
              </div>
            )}
        </div>
        <Route exact path="/" component={ImgList} />
        <Switch>
          <Route path="/mypage" component={Mypage} />
          <Route path="/upload" component={Upload} />
          <Route path="/image/info/:id" component={Imginfo} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
