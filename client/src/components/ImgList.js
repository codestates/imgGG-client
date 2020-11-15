import React from 'react';
import ImgListEntry from './ImgListEntry';

const ImgList = (props) => {
  return(
    <div>
      {props.imglist.map((v) => {
       return <div className="img-list"><ImgListEntry imglist={v} key={v.id} /></div>
    })}
    </div>
  );
};

export default ImgList;
