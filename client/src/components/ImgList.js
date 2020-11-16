import React from 'react';
import ImgListEntry from './ImgListEntry';

const ImgList = (props) => {
  return(
    <div>
      {props.imglist.map((v) => {
       return <div className="img-list" key={v.id}><ImgListEntry imglist={v} /></div>
    })}
    </div>
  );
};

export default ImgList;
