import '../common/css/menu.scss';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useMenuStore } from '../common/store/useMenuStore.ts';

const ListRoutes = () => {
  const [ mainMenu, subMenu, currentMainMenu, currentSubMenu, setCurrentMainMenu, setCurrentSubMenu ] = useMenuStore((state) => [
    state.mainMenu,
    state.subMenu,
    state.currentMainMenu,
    state.currentSubMenu,
    state.setCurrentMainMenu,
    state.setCurrentSubMenu
  ])

  useEffect(() => {
    new Promise((resolve, reject) => {
      if(currentMainMenu !== '' && mainMenu[currentMainMenu] === undefined) { reject('404 main') }
      
      resolve('Menu Validation Completed');
    }).then(() => {
      if(currentSubMenu !== '' && subMenu[currentMainMenu].filter((menu => (menu.sub_type === currentSubMenu))).length < 1) {
        return new Promise((resolve, reject) => reject('404 sub'));
      }
    }).catch((error) => {
      throw error;
    })
  }, [currentMainMenu, currentSubMenu]);


  useEffect(()=> {
    const currentURL = window.location.href;
    const objectURL = new URL(currentURL);
    const pathSegments = objectURL.pathname.split('/').filter(segment => segment !== '');
    if(currentMainMenu === '') {
      setCurrentMainMenu(pathSegments[1]);
    }
    if(currentSubMenu === '') {
      setCurrentSubMenu(pathSegments[2] ?? '');
    }
  }, []);
  return (
    <>
      <div className='list-sub-menu'>
        {
          subMenu[currentMainMenu]?.map((subMenu, menuIdx:number) => {
            return (
              <span key={`submenu-list-${menuIdx}`}>{subMenu.keyword}</span>
            )
          })
        }
      </div>
      <span>{currentSubMenu}</span>
    </>
  )
}

export default ListRoutes;