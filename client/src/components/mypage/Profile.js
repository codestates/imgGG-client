import React, { Component } from 'react';
import SetAvatar from './SetAvatar';
import SetPassword from './SetPassword';
import './Mypage.css';

class Profile extends Component {
  render() {
    return (
      <div>
        <SetAvatar />
        <SetPassword />
      </div>
    );
  }
}

export default Profile;
