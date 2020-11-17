import React, { Component } from 'react';
import Search from './Search';
import ImgListEntry from './ImgListEntry';

class ImgList extends Component {
  constructor(props){
    super(props);
    this.state = {
      value: '',
      currentImg: props.imglist,
      allImg: props.imglist,
      recently: true,
      likely: true
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSearchClick = this.handleSearchClick.bind(this);
    this.handleGotoBack = this.handleGotoBack.bind(this);
    this.handleRecently = this.handleRecently.bind(this);
    this.handleLike = this.handleLike.bind(this);
    this.handleChangeRec = this.handleChangeRec.bind(this);
  }

  handleChangeRec() {
    let value = document.querySelector(".form-control").value;
    this.setState({value: value});
    setTimeout(() => {
      this.handleSearchClick();
    }, 1);
  }


  handleGotoBack() {
    let allImg = this.state.allImg;
    this.setState({currentImg: allImg});
    window.location.reload();
  }
  handleLike() {
    let currentImg = this.state.currentImg;
    let likely = this.state.likely;
    let recursion = (arr) => {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i + 1]) {
          if (likely) {
            if (arr[i].like < arr[i + 1].like) {
              let a = arr[i]
              arr[i] = arr[i + 1]
              arr[i + 1] = a;
              recursion(arr);
            }
          } else {
            if (arr[i].like > arr[i + 1].like) {
              let a = arr[i]
              arr[i] = arr[i + 1]
              arr[i + 1] = a;
              recursion(arr);
            }
          } 
        } else return;
      }
    }
    recursion(currentImg);
    this.setState({currentImg: currentImg, likely: !likely, recently: true})
  }

  handleRecently() {
    let currentImg = this.state.currentImg;
    let recently = this.state.recently;
    let recursion = (arr) => {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i + 1]) {
          if (recently) {
            if (arr[i].id < arr[i + 1].id) {
              let a = arr[i]
              arr[i] = arr[i + 1]
              arr[i + 1] = a;
              recursion(arr);
            }
          } else {
            if (arr[i].id > arr[i + 1].id) {
              let a = arr[i]
              arr[i] = arr[i + 1]
              arr[i + 1] = a;
              recursion(arr);
            }
          } 
        } else return;
      }
    }
    recursion(currentImg);
    this.setState({currentImg: currentImg, recently: !recently, likely: true})
  }

  handleInputChange(e) {
    this.setState({
      value: e.target.value,
    });
    console.log(this.state)
  }

  handleSearchClick() {
    let changeImg = [];
    let value = this.state.value;
    let current = this.state.allImg;
    for(let i =0; i < current.length; i++){
      if(current[i].alltag.indexOf(value) >= 0){
        changeImg.push(current[i]);
      }
    }
    this.setState({currentImg: changeImg, value: ''});
    console.log(this.state)
  }

  render() {
    return(
      <div>
        <Search currentImg={this.state} 
        handleInputChange={this.handleInputChange} 
        handleSearchClick={this.handleSearchClick} 
        handleGotoBack={this.handleGotoBack}
        handleRecently={this.handleRecently}
        handleLike={this.handleLike}
        handleChangeRec = {this.handleChangeRec}/>
        {this.state.currentImg.map((v) => {
        return <div className="img-list" key={v.id}><ImgListEntry allImg={this.props.imglist} imglist={v} /></div>
      })}
      </div>
    );
  }
};

export default ImgList;
