import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const ImgListEntry = (props) => {
  return (
    <div>
      <Link to={{
        pathname: "/img_detail/" + props.imglist.id,
        state : {
          url: props.imglist.url,
          alltag: props.imglist.alltag
        },
        }}>
        <img src={props.imglist.url} className="imagefile"></img>
      </Link>
    </div>
  );
};

export default ImgListEntry;
