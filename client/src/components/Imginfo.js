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
            <div>태그</div>
            {(this.props.location.state.alltag).map(v => (
              <div key={v} className="tag-name">{v}</div>
            ))}
          </div>
        </div>
      </div>
      </div>
    );
  }
}

export default Imginfo;
