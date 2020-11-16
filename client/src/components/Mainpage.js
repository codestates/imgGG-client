import React, { Component } from 'react';
import ImgList from './ImgList';
import Search from './Search';
import { fakeData } from './mypage/fakedata'

class Mainpage extends Component {
  constructor(props){
    super(props);
    this.state = { saveImg: fakeData, currentImg: null}
  }
  
  render() {
    return (
      <div>
        <Search />
        <ImgList imglist={this.state.saveImg}/>
      </div>
    );
  }
}

export default Mainpage;
