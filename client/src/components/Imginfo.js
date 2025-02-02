import React, { Component } from 'react';
import "./Imginfo.css"
import axios from 'axios';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faThumbsUp} from "@fortawesome/free-solid-svg-icons";
import {faUserCircle} from "@fortawesome/free-solid-svg-icons";
import cookie from 'react-cookies';
import {Link} from 'react-router-dom';

const token = cookie.load('token');

class Imginfo extends Component {
  constructor(props){
    super(props);
    this.state = {
      imginfo: '',
      isLike: true,
      likeCount: '',
      isLogin: false,
      userId: '',
    }
  }

  componentDidMount() {
    if(token) {
      axios.get('http://ec2-13-209-73-178.ap-northeast-2.compute.amazonaws.com/user/info',
      { 
        headers: {'token': token}, 
        withCredentials: true,
      })
      .then(result => {
        this.setState({
          isLogin: true,
          userId: result.data.id
        })
      });
    }
    axios.get('http://ec2-13-209-73-178.ap-northeast-2.compute.amazonaws.com'+this.props.location.pathname,
    { headers: {'token': token}, 
      withCredentials: true }
    )
    .then((result) => { this.setState({
      imginfo: result.data,
      likeCount: result.data.like_count
    })
      if(result.data.user.user_like){
        this.setState({
          isLike: true,
        })
      }else{
      this.setState({
          isLike:false,
      });}
    })
  };
  
  handleLike = () => {
    if(token){
    axios.post('http://ec2-13-209-73-178.ap-northeast-2.compute.amazonaws.com/image/like',
    {imageId: this.state.imginfo.id},
    {
      headers: {'token': token}, 
      withCredentials: true})
    .then((res)=>{
    if(this.state.isLike){
    this.setState({
      isLike: false,
      likeCount: res.data.like_count
    })}else{
      this.setState({
        isLike: true,
        likeCount: res.data.like_count
      })
    }})
  }else{
    alert('로그인 후 이용해주세요');
  }
  }

  render() {
    return (
      <div>
        <div className='top-info'>
            <div className='imginfo'>이미지 정보</div>
        </div>
          <div className="info-box">
        <div className="img-box">
          <div className='pic-preview'>
            <img src={this.state.imginfo.image_url} className="img-detail" alt="img"></img>
          </div>
          
        </div>  
        <div className="img-info">
            <div className="user-info">
            {this.state.imginfo ? <>{this.state.imginfo.user.user_image_url ?
              <img className="profile" src={this.state.imginfo.user.user_image_url} width="50px" height="50px" alt="img"/>:
              <div width="50px" height="50px"><FontAwesomeIcon icon={faUserCircle} size="3x"/></div>
              }
              <div><div className="user">{this.state.imginfo.user.username}</div>
              <div className="user">{this.state.imginfo.user.email}</div>
              </div>
              </>
              : ''}
            </div>
            <div className="wrap">
            <div className={this.state.isLike ? "like-btn active": "like-btn"} onClick={this.handleLike}>
                <FontAwesomeIcon className="icon" color="white" icon={faThumbsUp} />
                <div className="count">{this.state.likeCount}</div>
            </div>
            </div>
            <div className="tags">
              <h3>태그</h3>
            {this.state.imginfo.tags ? this.state.imginfo.tags.map(v => (
              <div key={v.id} className="tag-name">
                <Link to={{pathname:"/", state: {tags: v.tag_name}}}>{v.tag_name}</Link>
              </div>
            )) : <div></div>} 
            </div>
        </div>
        </div>
      </div>
    );
  }
}

export default Imginfo;
