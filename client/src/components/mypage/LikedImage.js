import React, { Component } from 'react';
import ImgList from '../ImgList';
class LikedImage extends Component {
  render() {
    return (
      <div>
        <ImgList like={this.props.info}/>
      </div>
    );
  }
}

export default LikedImage;
