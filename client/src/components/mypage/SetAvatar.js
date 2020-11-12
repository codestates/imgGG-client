import React, { Component } from 'react';

class SetAvatar extends Component {
  render() {
    return (
      <div className="avatar-upload">
        <h5>프로필 사진 변경</h5>
        <div className="avatar">이미지</div>
        <div className="btn">
          <button>변경</button>
        </div>
      </div>
    );
  }
}

export default SetAvatar;
