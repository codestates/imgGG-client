import React from 'react';
import { Link } from 'react-router-dom';

const ImgListEntry = (props) => {
  return (
    <div>
      <Link to={{
        pathname: "/img/info/" + props.imglist.id,
        state : {
          url: props.imglist.url,
          alltag: props.imglist.alltag,
          allImg: props.allImg
        },
        }}>
        <img src={props.imglist.url} className="imagefile" alt="img"></img>
      </Link>
    </div>
  );
};

export default ImgListEntry;
