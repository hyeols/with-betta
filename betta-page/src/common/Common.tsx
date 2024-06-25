import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header, SubMenu } from './page/index.ts';

const Common = () => {
  return (
    <BrowserRouter>
      <Header/>
      {/* <SubMenu className='common-leftmenu'/> */}
    </BrowserRouter>
  );
}

export default Common;