import React from "react";
import "./Upload.css";
import Nav from './Nav';
import axios from 'axios'
import { Link } from 'react-router-dom';
import { IMGBB_API_KEY } from '../config/config';

class Upload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          file : '',
          previewURL : '',
          img : false
        }
    this.handleInputValue = this.handleInputValue.bind(this);
    this.handleSubmitImg = this.handleSubmitImg.bind(this);
    }

    handleInputValue = (event) => {
        let uploadImage = (img) => {
          let body = new FormData()
          body.set('key', IMGBB_API_KEY)
          body.append('image', img)
      
          return (axios({
            method: 'post',
            url: 'https://api.imgbb.com/1/upload',
            data: body
          }))
        }
        uploadImage(event.target.files[0])
        .then(resp => {
          this.setState({file : resp,
          previewURL : resp.data.data.display_url,
          img : true})
        })
      };
    
    handleSubmitImg = () => { 
      const {file,previewURL,img} = this.state
        const imgInfo = {file,previewURL,img};
        console.log(imgInfo)
    }

    render(){
    return (<div>
        <Nav />
        <div className="upload-box">

          <input type="file" name="file" accept="image/*" onChange={this.handleInputValue} className="input-btn"></input>
            <div className="preview-box">    
                {this.state.file.length !==0 ? (<img className="preview" src={this.state.previewURL}></img>) : (<div>사진 미리보기</div>)}
            </div>
            <div className="upload-btn">
              <button type='submit' onClick={this.handleSubmitImg}>업로드</button>
            </div>
            <div className="gotoMain">
              <Link to='/'>메인페이지로</Link>
            </div>
        </div>
        <div className="upload-info">
          태그: <input></input>
          <button>추가</button>
        </div>
    </div>)
    }
}

export default Upload;