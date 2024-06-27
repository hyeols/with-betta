import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Header } from './page/index.ts';

const Common = () => {
  return (
    <BrowserRouter>
      <Header/>
      {/* <SubMenu className='common-leftmenu'/> */}
    </BrowserRouter>
  );
}

export default Common;