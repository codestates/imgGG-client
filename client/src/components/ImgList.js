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
      alluser: [],
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

    axios.get('http://localhost:4000/image/tag',
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
    setTimeout(() => {
      this.handleRecently();
    }, 1);
  }

  handleGotoBack() {
    axios.post('http://localhost:4000/image/search/recently', {
      searchWord: '',
      userId: ''
    }, { withCredentials: true })
      .then((result) => {
        this.setState({allImg: result.data, currentImg: result.data});
        console.log(this.state)
      })
      .catch(err => {
        this.setState({
          error: '사진이 없습니다'
        })
      })
      document.querySelector('.form-control').value = '';
  }
  handleLike() {
    axios.post('http://localhost:4000/image/search/like', {
      searchWord: this.state.value,
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
      document.querySelector('.form-control').value = '';
  }

  handleRecently() {
    axios.post('http://localhost:4000/image/search/recently', {
      searchWord: this.state.value,
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
    console.log(this.state);
    return( 
      <div>
        <Search imglist={this.state} 
        handleInputChange={this.handleInputChange}  
        handleGotoBack={this.handleGotoBack}
        handleRecently={this.handleRecently}
        handleLike={this.handleLike}
        handleChangeRec = {this.handleChangeRec}/>
        {(this.state.currentImg) ? (this.state.currentImg.map((v) => (
         <div className="img-list" key={v.id}><ImgListEntry imglist={v} /></div>
        ))): (<div>사진이없습니다</div>)}
      </div>
    );
  }
};

export default ImgList;
