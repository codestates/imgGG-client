import React, { Component } from 'react';
import "./Imginfo.css"
import axios from 'axios';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faThumbsUp} from "@fortawesome/free-solid-svg-icons";
import cookie from 'react-cookies';

const token = cookie.load('token');

class Imginfo extends Component {
  constructor(props){
    super(props);
    this.state = {
      imginfo: '',
      isLike: false,
      likeCount: '',
      isLogin: false,
      userId: '',
    }
  }

  componentDidMount() {
    if(token) {
      axios.get('http://localhost:4000/user/info',
      { withCredentials: true})
      .then(result => {
        this.setState({
          isLogin: true,
          userId: result.data.id
        })
      });
    }
    axios.get('http://localhost:4000'+this.props.location.pathname,
    { withCredentials: true }
    )
    .then((result) => {
      this.setState({
        imginfo: result.data,
        likeCount: result.data.like_count
      });
      console.log('이미지정보',this.state.imginfo);
    })
  };
  
  handleLike = () => {
    if(token){
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
  }

  render() {
    console.log(this.props);
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
              {this.state.imginfo ? <><img className="profile" src={this.state.imginfo.user.user_image_url} width="50px" height="50px" alt="img"/> 
    <div className="user">{this.state.imginfo.user.username}</div>
    <div>{this.state.imginfo.user.email}</div>
              </>
              : ''}
            </div>
            <div className="wrap">
            <div className="like-btn" onClick={this.handleLike}>
              {/* <button className="like-btn" onClick={this.handleLike}> */}
                <FontAwesomeIcon className="icon" color="white" icon={faThumbsUp} size="2x"/>
                {this.state.likeCount}
                {/* </button> */}
            </div>
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
