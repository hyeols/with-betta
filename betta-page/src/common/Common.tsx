import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header, SubMenu } from './page/index.ts';
import { Betta } from '../menu/index.ts';

const DivRoutes = () => {
  return (
    <Routes>
      <Route path='/betta*' element={<Betta/>}></Route>
    </Routes>
  );
}



const Common = () => {
  return (
    <BrowserRouter>
      <Header/>
      <SubMenu className='common-leftmenu'/>
      <div className='common-body'>
        <DivRoutes/>
      </div>
    </BrowserRouter>
  );
}

export default Common;