import React from 'react';
import { useMenuStore } from '../../common/store/useMenuStore';

const Betta = () => {
  const [ currentMainMenu, currentSubMenu ] = useMenuStore((state) => [
    state.currentMainMenu,
    state.currentSubMenu
  ])
  return (
    <>
    <div>{currentMainMenu}</div>
    <div>{currentSubMenu}</div>
    </>
  );
}

export default Betta;