import React from "react";
import "./Upload.css"


class Upload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          file : '',
          previewURL : '',
          img : false
        }
    this.handleInputValue = this.handleInputValue.bind(this);
    this.handleSumitImg = this.handleSumitImg(this);
    }

    handleInputValue = (event) => {
        let reader = new FileReader();
        let file = event.target.files[0];
        reader.onloadend = () => {
          this.setState({
            file : file,
            previewURL : reader.result,
            img: true
          })

        console.log(this.state)
        }
        reader.readAsDataURL(file);
      };
    
    handleSumitImg = () => { 
        const imgInfo = {name: this.state.file.name, url: this.state.previewURL};
        console.log(imgInfo);
    }

    render(){
    return (<div>
        <input type="file" name="file" accept="image/*" onChange={this.handleInputValue}></input>
        <div className="preview-box">    
            {this.state.file.length !==0 ? (<img className="preview" src={this.state.previewURL}></img>) : (<div>사진 미리보기</div>)}
        </div>
        <button type='submit' onClick={this.handleSumitImg}>업로드</button>
    </div>)
    }
}

export default Upload;