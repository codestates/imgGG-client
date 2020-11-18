import React, { Component } from 'react';
import "./Imginfo.css"
import axios from 'axios';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faThumbsUp} from "@fortawesome/free-regular-svg-icons";


class Imginfo extends Component {
  constructor(props){
    super(props);
    this.state = {
      imginfo: '',
      isLike: false,
      likeCount: '',
    }
  }

  componentDidMount() {
    axios.get('http://localhost:4000'+this.props.location.pathname,
    { withCredentials: true }
    )
    .then((result) => {
      console.log(result);
      this.setState({
        imginfo: result.data,
        likeCount: result.data.like_count
      });
    })
  };
  
  handleLike = () => {
    axios.post('http://localhost:4000/image/like',
    {imageId: this.state.imginfo.id},
    {withCredentials: true})
    .then(()=>{
    if(this.state.isLike){
    this.setState({
      isLike: !this.state.isLike,
      likeCount: this.state.likeCount-1
    })}else{
      this.setState({
        isLike: !this.state.isLike,
        likeCount: this.state.likeCount+1
      })
    }})
  }

  render() {

    console.log(this.props)

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
            <div className="user-info">
              {this.state.imginfo ? <><img className="profile" src={this.state.imginfo.user.user_image_url} width="50px" height="50px"/> 
    <div className="user">{this.state.imginfo.user.username}</div>
    <div>{this.state.imginfo.user.email}</div>
              </>
              : ''}
            </div>
            <div>
              <button className="like-btn" onClick={this.handleLike}><FontAwesomeIcon className="icon" icon={faThumbsUp}/>{this.state.likeCount}</button>
            </div>
            <div className="tags">태그</div>
            {this.state.imginfo.tags ? this.state.imginfo.tags.map(v => (
              <div key={v.id} className="tag-name" >{v.tag_name}</div>
            )) : <div></div>} 
          </div>
          <div>
          {this.state.imginfo.user ? <h1>{this.state.imginfo.user.username}</h1> : <div></div>}
          </div>
        </div>
        </div>
      </div>
    );
  }
}

export default Imginfo;
