import React from 'react';
import './Icon.css';
import Img from './icon-for-main-window.png';

const Icon = () => {
  return (
    <div className='Icon'>
      <img src={Img} alt='Icon'/>
    </div>
  );
};

export default Icon;