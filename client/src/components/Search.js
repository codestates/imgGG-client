import React from 'react';
import './Search.css';

const Search = (props) => {
  let recommand = [];
  let recommandTag = [];
  for(let i =0 ; i < props.imglist.tag.length; i++){
    recommand.push(props.imglist.tag[i].tag_name);
  }
  for(let j =0 ; j < recommand.length; j++){
    if(recommand[j].indexOf(props.imglist.value) !== -1){
      recommandTag.push(recommand[j]);
    }
  }
  return (
    <div className="search-bar">
      <input
        className="form-control"
        type="text"
        placeholder="태그를 입력하세요"
        value={props.imglist.value}
        onChange={props.handleInputChange}
      />
        <button className="btn-listing" onClick={props.handleRecently}>최신순</button>
        <button className="btn-listing" onClick={props.handleLike}>좋아요순</button>
        <button className="btn-listing" onClick={props.handleGotoBack}>새로고침</button>
      <div className="recommand">
        <div className="recommand-tag">
          {(recommandTag[0] && props.imglist.value !== '') ? <h3>태그추천</h3> : null}
          {(recommandTag[0] && props.imglist.value !== '') ? (recommandTag).map((tag,index) => (
        <span key={index} className="map-tag" onClick={()=>{
          document.querySelector(".form-control").value = tag; props.handleChangeRec();  recommandTag=null;
        }}>{tag}</span>)) : null}
      </div>
      </div>
    </div>
  );
}

export default Search;
