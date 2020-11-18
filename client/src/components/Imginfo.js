import React, { Component } from 'react';
import "./Imginfo.css"
import axios from 'axios';

class Imginfo extends Component {
  constructor(props){
    super(props);
    this.state = {
      imginfo: ''
    }
  }

  componentDidMount() {
    axios.get('http://localhost:4000/image/info/'+this.props.location.state.id,
    { withCredentials: true }
    )
    .then((result) => {
      this.setState({
        imginfo: result.data
      });
    }) 
  };
  render() {
    return (
      <div>
          <div className="info-box">
        <div className="img-box">
          <div className='pic-preview'>
            <img src={this.state.imginfo.image_url} className="img-detail" alt="img"></img>
          </div>
        </div>  
        <div className="img-info">
          <div>
            <div>태</div>
            {this.state.imginfo.tags ? this.state.imginfo.tags.map(v => (
              <div key={v.id} className="tag-name" >{v.tag_name}</div>
            )) : <div></div>} 
          </div>
        </div>
        </div>
      </div>
    );
  }
}

export default Imginfo;
