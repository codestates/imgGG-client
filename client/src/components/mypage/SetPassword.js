import React, { Component } from 'react';

class SetPassword extends Component {
  render() {
    return (
      <div className="set-password">
        <h5>비밀번호 변경</h5>
        <div>
          <input type="password" placeholder="현재 비밀번호"></input>
        </div>
        <div>
          <input type="password" placeholder="새 비밀번호"></input>
        </div>
        <div>
          <input type="password" placeholder="새 비밀번호 확인"></input>
        </div>
        <div>
          <button>변경</button>
        </div>
      </div>
    );
  }
}

export default SetPassword;
