import React, { Component } from 'react';
import ImgList from '../ImgList';

class UploadImage extends Component {
  render() {
    return (
      <div>
        <ImgList upload={this.props.info}/>
      </div>
    );
  }
}

export default UploadImage;
