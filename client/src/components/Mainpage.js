import React, { Component } from 'react';
import ImgList from './ImgList';
import Search from './Search';

class Mainpage extends Component {
  render() {
    return (
      <div>
        <Search />
        <ImgList />
      </div>
    );
  }
}

export default Mainpage;
