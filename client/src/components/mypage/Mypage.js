import React, { Component } from 'react';
import MenuTab from './MenuTab';

class Mypage extends Component {
  
  render() {
    return (

      <div className="top">
        <MenuTab info={this.props.location.state}/>
      </div>
    );
  }
}

export default Mypage;
