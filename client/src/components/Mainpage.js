import React, { Component } from 'react';
import Nav from './Nav';
import ImgList from './ImgList';
import Search from './Search';

class Mainpage extends Component {
  render() {
    return (
      <div>
        <Nav />
        <Search />
        <ImgList />
      </div>
    );
  }
}

export default Mainpage;
