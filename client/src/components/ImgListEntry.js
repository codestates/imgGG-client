import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ImgListEntry extends Component {
  render(){
    return (
      <div>
        <Link to={{
          pathname: "/image/info/" + this.props.imglist.id,
          state : {
            id: this.props.imglist.id,
            image_url: this.props.imglist.image_url,
            alltag: this.props.imglist.alltag
          },
          }}>
          <img src={this.props.imglist.image_url} className="imagefile" alt="img"></img>
        </Link>
      </div>
    );
  }
};

export default ImgListEntry;
