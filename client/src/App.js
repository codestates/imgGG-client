import React, { Component } from 'react';
import Mainpage from './components/Mainpage';
import Mypage from './components/mypage/Mypage';
import { Route, Switch } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path="/" component={Mainpage} />
        <Switch>
          <Route path="/mypage" component={Mypage} />
        </Switch>
      </div>
    );
  }
}

export default App;
