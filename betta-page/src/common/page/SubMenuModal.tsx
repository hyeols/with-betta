import React, { useEffect, useState } from 'react';
import { useCommStore } from '../store/useCommStore';
import { useMenuStore } from '../store/useMenuStore';
import { useNavigate } from 'react-router-dom';


const SubMenuModal = ({ className }: { className: string }) => {
  const [ modalType, setModalType ] = useCommStore((state) => [
    state.modalType,
    state.setModalType
  ]);
  const [ subMenu, currentMainMenu, currentSubMenu, setCurrentMainMenu, setCurrentSubMenu ] = useMenuStore((state) => [
    state.subMenu,
    state.currentMainMenu,
    state.currentSubMenu,
    state.setCurrentMainMenu,
    state.setCurrentSubMenu
  ]);

  const nav = useNavigate();
  const moveSubPage = (name: string, endpoint: string) => {
    setCurrentMainMenu(modalType);
    setCurrentSubMenu(name);
    setModalType('');
    nav(endpoint);
  }

  if(modalType === '') return null;
  return (
    <div className={className}>
      {subMenu[modalType].map((menu, menuIdx: number) => {
        return (
          <span
            className={
              (currentMainMenu === modalType && currentSubMenu === menu.name)
              ? 'active'
              : '' 
            }
            key={`modal-submenu-${menuIdx}`}
            onClick={() => moveSubPage(menu.name, menu.endpoint)}
          >
            {menu.name}
          </span>
        );
      })}
    </div>
  );
}

export default SubMenuModal;