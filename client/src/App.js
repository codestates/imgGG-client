import React, { Component } from 'react';
import Mainpage from './components/Mainpage';
import Mypage from './components/mypage/Mypage';
import { Route, Switch, Link, withRouter } from 'react-router-dom';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Upload from './components/Upload';
import Imginfo from './components/Imginfo';
import './App.css';
import axios from 'axios';
import cookie from 'react-cookies';

class App extends Component {
  state = {
    isLogin: false,
    userinfo: null,
    signinOpen: false,
    signupOpen: false,
  };

  componentDidMount = () => {
    const token = cookie.load('token');
    if(token) {
      axios.get('http://localhost:4000/user/info', 
      { withCredentials: true }
      )
      .then((result)=>{
        console.log(result.data)
        this.setState({
          isLogin: true,
          userinfo: result.data
        })
      })
    }
  }

  handleResponseSuccess = () => {
    axios.get('http://localhost:4000/user/info',
    { withCredentials: true }
    )
    .then((result) => {
      this.setState({
        isLogin: true, 
        signinOpen: false,
        userinfo: result.data
      });
      console.log(this.state);
    }) 
  };

  handleSignupSuccess = () => {
    this.setState({
      signupOpen: false,
    });
  }

  handleLogout = () => {
    
    axios.post('http://localhost:4000/user/signout',
    {},
    { withCredentials: true })
    .then(()=> {
      this.setState({isLogin: false, userinfo: null});
      this.props.history.push('/');
      console.log(this.state);
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
          <h1 className="logo" onClick={()=>{(window.location.reload())}}>
            <Link to="/">ImgGG</Link>
          </h1>
          {!this.state.isLogin ? (
            <div className="menu">
              <div className="menu-item">
                <span onClick={this.openSignin}>로그인</span>
                <Signin open={this.state.signinOpen} close={this.closeSignin} handleResponseSuccess={this.handleResponseSuccess} />
              </div>
              <div className="menu-item">
                <span onClick={this.openSignup} >회원가입</span>
                <Signup open={this.state.signupOpen} close={this.closeSignup} handleSignupSuccess={this.handleSignupSuccess}/>
              </div>
            </div>
          ) : (
              <div className="menu">
                <span onClick={this.handleLogout}>
                  <Link to="/">로그아웃</Link>
                </span>
                <span>
                  <Link to={{
                    pathname: "/mypage",
                    state : {
                     userinfo: this.state.userinfo
                    },
                  }}>마이 페이지</Link>
                </span>
                <span>
                  <Link to={{pathname:"/upload", state: {userinfo: this.state.userinfo}}}>업로드</Link>
                </span>
              </div>
            )}
        </div>
        <Route exact path="/" component={Mainpage} />
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
