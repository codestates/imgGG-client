import React, { Component } from 'react';
import "./Imginfo.css"
import axios from 'axios';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faThumbsUp, faUser} from "@fortawesome/free-solid-svg-icons";
import {faUserCircle} from "@fortawesome/free-solid-svg-icons";
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
      
      
      // if(token) {
      //   axios.get('http://localhost:4000/user/likes',
      // {withCredentials: true})
      // .then(result => {
      //   console.log("result",result.data.userLikes);
      //   const userLikes = result.data.userLikes;
      //   const image = userLikes.filter((id)=> {
      //     return id.imageId===this.state.imginfo.id;
      //   });
      //   console.log('image',image);
      //   if(image.length > 0){
      //   this.setState({
      //     isLike: true,
      //   })
      // }else{
      //   this.setState({
      //     isLike:false,
      //   })
      // }
      // });
      // }
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
      isLike: false,
      likeCount: this.state.likeCount-1
    })}else{
      this.setState({
        isLike: true,
        likeCount: this.state.likeCount+1
      })
    }})
  }
  }

  handleTagClick = () => {
    
  }

  render() {
    console.log(this.state.isLike);
    return (
      <div>
          <div className="info-box">
        <div className="img-box">
          <div className='pic-preview'>
            <img src={this.state.imginfo.image_url} className="img-detail" alt="img"></img>
          </div>
          <div className="wrap">
            <div className={this.state.isLike ? "like-btn active": "like-btn"} onClick={this.handleLike}>
                <FontAwesomeIcon className="icon" color="white" icon={faThumbsUp} />
                <div className="count">{this.state.likeCount}</div>
            </div>
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
            <div className="tags">
              <div>태그</div>
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
