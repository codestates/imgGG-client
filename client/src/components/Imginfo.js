import React, { Component } from 'react';
import "./Imginfo.css"

class Imginfo extends Component {


  render() {
    console.log(this.props)
    return (
      <div>
        <div className="info-box">
          <div className="img-box">
            <div className='pic-preview'>
              <img src={this.props.location.state.url} className="img-detail" alt="img"></img>
            </div>
          </div>  
          <div className="img-info">
            <div>
              <div className="user-info">유저정보</div>
              <div className="like-btn">좋아요버튼</div>
              <div className="tags">태그
                {(this.props.location.state.alltag).map(v => (
                  <div key={v} className="tag-name" >{v}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Imginfo;
