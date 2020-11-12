import React, { Component } from 'react';
import Nav from '../Nav';
import '../Nav.css';
import MenuTab from './MenuTab';

class Mypage extends Component {
  render() {
    return (
      <div>
        <Nav />
        <MenuTab />
      </div>
    );
  }
}

export default Mypage;
