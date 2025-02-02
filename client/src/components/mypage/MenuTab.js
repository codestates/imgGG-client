import React, { Component } from 'react';
import Profile from './Profile';
import UploadImage from './UploadImage';
import LikedImage from './LikedImage';



class MenuTab extends Component {
  state = {
    activeTab: 0,
  };

  handleTabClick = (id) => {
    this.setState({ activeTab: id });
  };  
  render() {
    const content = {
      0: <Profile info={this.props.info}/>,
      1: <UploadImage info={this.props.info}/>,
      2: <LikedImage info={this.props.info}/>,
    };
    const tabName = ['프로필', '업로드한 이미지', '좋아요 표시한 이미지'];
    return (
      
      <div className="tabs-wrapper">
        <div className="tabs">
          {tabName.map((tab, i) => {
            return (
              <div key={i} className="tabs-contents" onClick={() => this.handleTabClick(i)}>
                {tab}
              </div>
            );
          })}
        </div>
        <div className="content">{content[this.state.activeTab]}</div>
      </div>
    );
  }
}

export default MenuTab;
