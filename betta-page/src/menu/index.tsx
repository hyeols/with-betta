import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useMenuStore } from '../common/store/useMenuStore';

const ListRoutes = () => {
  const [ currentMainMenu, currentSubMenu, setCurrentMainMenu, setCurrentSubMenu ] = useMenuStore((state) => [
    state.currentMainMenu,
    state.currentSubMenu,
    state.setCurrentMainMenu,
    state.setCurrentSubMenu
  ])

  useEffect(()=> {
    const currentURL = window.location.href;
    const objectURL = new URL(currentURL);
    const pathSegments = objectURL.pathname.split('/').filter(segment => segment !== '');
    
    setCurrentMainMenu(pathSegments[1]);
    setCurrentSubMenu(pathSegments[2] ?? '');
  }, []);
  return (
    <>
      <span>{currentMainMenu}</span>
      <span>{currentSubMenu}</span>
    </>
  )
}

export default ListRoutes;