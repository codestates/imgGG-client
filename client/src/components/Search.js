import React from 'react';
import './Search.css';

const Search = (props) => {
  let allofTag = [];
  let recommandTag = [];

  for (let i = 0; i < props.currentImg.allImg.length; i++) {
    allofTag = allofTag.concat(props.currentImg.allImg[i].alltag);
  }

  for (let j = 0; j < allofTag.length; j++) {
    if (recommandTag.indexOf(allofTag[j]) === -1) {
      if (allofTag[j].indexOf(props.currentImg.value) !== -1) {
        recommandTag.push(allofTag[j]);
      }
    }
  }
  console.log(allofTag);
  console.log(recommandTag);
  return (
    <div className="search-bar">
      <input
        className="form-control"
        type="text"
        placeholder="태그를 입력하세요"
        value={props.currentImg.value}
        onChange={props.handleInputChange}
      />
        <button className="btn-listing" onClick={props.handleRecently}>{`${props.currentImg.recently ? '최신순' : '오래된순'}`}</button>
        <button className="btn-listing" onClick={props.handleLike}>{`${!props.currentImg.likely ? '싫어요' : '좋아요'}`}</button>
        <button className="btn-listing" onClick={props.handleGotoBack}>새로고침</button>
      <div className="recommand">
        <div className="recommand-tag">
          {(recommandTag[0] && props.currentImg.value !== '') ? <div>태그추천</div> : null}
          {(recommandTag[0] && props.currentImg.value !== '') ? (recommandTag).map((tag,index) => (
        <span key={index} className="map-tag" onClick={()=>{
          document.querySelector(".form-control").value = tag; props.handleChangeRec()
        }}>{tag}</span>)) : null}
        </div>
      </div>
    </div>
  );
}

export default Search;
