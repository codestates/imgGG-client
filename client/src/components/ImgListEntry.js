import React, { Component } from 'react';
import img from '../img/1.jpg';

const ImgListEntry = () => {
  return (
    <span className="image-list-entry">
      <img src={img} width="150" height="150" />
    </span>
  );
};

export default ImgListEntry;
