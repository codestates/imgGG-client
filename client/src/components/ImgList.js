import React, { Component } from 'react';
import Search from './Search';
import ImgListEntry from './ImgListEntry';
import axios from 'axios';

class ImgList extends Component {
  constructor(props){
    super(props);
    this.state = {
      value: '',
      tag: [],
      currentImg: [],
      allImg: [],
      error: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleGotoBack = this.handleGotoBack.bind(this);
    this.handleRecently = this.handleRecently.bind(this);
    this.handleLike = this.handleLike.bind(this);
    this.handleChangeRec = this.handleChangeRec.bind(this);
  }
  
  componentDidMount = () => {
    if(this.props.upload){
      axios.post('http://localhost:4000/image/search/recently', {
        searchWord: null,
        userId: this.props.upload.userinfo.id
    }, { withCredentials: true })
      .then((result) => {
        this.setState({currentImg: result.data.images});
      })
      .catch(err => {
        this.setState({
          error: '사진이 없습니다'
        })
      })
    } else if(this.props.like){
      axios.get('http://localhost:4000/user/userlike', 
      { withCredentials: true })
        .then((result) => {
          this.setState({currentImg: result.data.results});
        })
        .catch(err => {
          this.setState({
            error: '사진이 없습니다'
          })
        })  
    } else if(this.props.location.state){
      axios.post('http://localhost:4000/image/search/recently', {
        searchWord: this.props.location.state.tags,
        userId: null
    }, { withCredentials: true })
      .then((result) => {
        console.log()
        this.setState({currentImg: result.data});
      })
      .catch(err => {
        this.setState({
          error: '사진이 없습니다'
        })
      })
    } else {
      axios.post('http://localhost:4000/image/search/recently', {
      }, { withCredentials: true })
        .then((result) => {
          this.setState({allImg: result.data, currentImg: result.data});
          console.log(result)
        })
        .catch(err => {
          this.setState({
            error: '사진이 없습니다'
          })
      })
    }

    axios.get('http://localhost:4000/image/tags',
    { withCredentials: true }
    )
    .then((result) => {
      this.setState({
        tag: result.data
      })
      console.log(this.state);
      
    })
  };

  handleChangeRec() {
    let value = document.querySelector(".form-control").value;
    this.setState({value: value});
    this.handleRecently();
  }

  handleGotoBack() {
    axios.post('http://localhost:4000/image/search/recently', {
      searchWord: '',
      userId: ''
    }, { withCredentials: true })
      .then((result) => {
        this.setState({allImg: result.data, currentImg: result.data, value: ''});
        console.log(this.state)
      })
      .catch(err => {
        this.setState({
          error: '사진이 없습니다'
        })
      })
  }
  handleLike() {
    axios.post('http://localhost:4000/image/search/like', {
      searchWord: document.querySelector(".form-control").value,
      userId: this.state.username
    }, { withCredentials: true })
      .then((result) => {
        this.setState({currentImg: result.data});
        console.log(this.state)
      })
      .catch(err => {
        this.setState({
          error: '사진이 없습니다'
        })
      })
  }

  handleRecently() {
    axios.post('http://localhost:4000/image/search/recently', {
      searchWord: document.querySelector(".form-control").value,
      userId: this.state.username
    }, { withCredentials: true })
      .then((result) => {
        this.setState({currentImg: result.data});
        console.log(this.state)
      })
      .catch(err => {
        this.setState({
          error: '사진이 없습니다'
        })
      })
  }

  handleInputChange(e) {
    this.setState({
      value: e.target.value,
    });
    console.log(this.state)
  }

 
  render() {
    return( 
      <div>
        {(this.props.like || this.props.upload) ? null : 
        <Search imglist={this.state} 
        handleInputChange={this.handleInputChange}  
        handleGotoBack={this.handleGotoBack}
        handleRecently={this.handleRecently}
        handleLike={this.handleLike}
        handleChangeRec = {this.handleChangeRec}/>}
        {(this.state.currentImg.length > 0) ? (this.state.currentImg.map((v) => (
         <div className="img-list" key={v.id}><ImgListEntry imglist={v} /></div>
        ))): (<div className="no-img">이미지가 없습니다</div>)}
      </div>
    );
  }
};

export default ImgList;
