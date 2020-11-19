import React, { Component } from 'react';
import SetAvatar from './SetAvatar';
import SetPassword from './SetPassword';
import './Mypage.css';

class Profile extends Component {
  render() {
    return (
      <div>
        <SetAvatar info={this.props.info}/>
        <SetPassword info={this.props.info}/>
      </div>
    );
  }
}

export default Profile;
