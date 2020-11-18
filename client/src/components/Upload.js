import React from "react";
import "./Upload.css";
import axios from 'axios'
import { IMGBB_API_KEY } from '../config/config';


class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: '',
      previewURL: '',
      tag: null,
      alltag: [],
      img: false,
      userinfo: this.props.location.state,
      error: ''
    }
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
        this.setState({
          file: resp,
          previewURL: resp.data.data.display_url,
          img: true
        })
      })
  };

  handleSubmitImg = () => {
    const image_url = this.state.previewURL;
    const tag_name = this.state.alltag;
    const userId = this.state.userinfo.id
    console.log(this.state.img)
    if (!this.state.img) {
      this.setState({
        error: '사진을 추가하세요'
      });
    } else {
      this.setState({ error: '' });
      axios.post("http://localhost:4000/image/post", {
        url: image_url,
        userId: userId,
        tags: tag_name
      }, {withCredentials: true})
      .then((result)=>{
        console.log()
        this.props.history.push(`/image/info/${result.data.id}`)
      })
      .catch(err => {
        this.setState({
          error: '업로드할 사진이 없습니다'
        })
      })
    }
  }

  handleAddTag = (e) => {
    this.setState({ tag: e.target.value });
    console.log(this.state);
  }

  handleAddAllTag = () => {
    const tag = this.state.tag
    const alltag = this.state.alltag;
    if(alltag.indexOf(tag) === -1 && tag !== ''){
      alltag.push(tag);
      this.setState({ tag: null, alltag: alltag });
    }
    let input = document.querySelector(".tag-input");
    input.value = '';
    console.log(this.state);
  }

  deleteTag = (value) => {
    let alltag = this.state.alltag;
    let idx = alltag.indexOf(value);
    alltag.splice(idx, 1);
    this.setState({alltag: alltag})
    console.log(this.state)
  }

  render() {
    console.log(this.state)
    return (<div>
      <div className="upload-box">
        <div className="preview-box">
          {this.state.file.length !== 0 ? (<img alt="img" className="preview" src={this.state.previewURL}></img>) : (<div className='pic-preview'>사진 미리보기</div>)}
        </div>
        <div className="upload-info">
          <input type="file" name="file" accept="image/*" onChange={this.handleInputValue} className="input-btn"></input>
          <input className="tag-input" onChange={this.handleAddTag} placeholder="태그입력"></input>
          <button type='submit' onClick={this.handleAddAllTag}>추가</button>
          <ul className='all-tag'>
            {(this.state.alltag).map(v => (
              <div key={v} className="tag-form">{v}
                <span onClick={this.deleteTag} className="delete-tag">✖</span>
              </div>
            ))}
          </ul>
          <div className="upload-btn" onClick={this.handleSubmitImg}>
            <button type='submit' disabled={this.state.previewURL ? false : 'disabled'}>업로드</button>
          </div>
        </div>
      </div>
    </div>)
  }
}

export default Upload;