import React from 'react';
import { useCommStore } from '../store/useCommStore';
import { useMenuStore } from '../store/useMenuStore';
import { useNavigate } from 'react-router-dom';


const SubMenuModal = ({ className }: { className: string }) => {
  const [ modalType, setModalType ] = useCommStore((state) => [
    state.modalType,
    state.setModalType
  ]);
  const [ subMenu, currentSubMenu, setCurrentMainMenu, setCurrentSubMenu ] = useMenuStore((state) => [
    state.subMenu,
    state.currentSubMenu,
    state.setCurrentMainMenu,
    state.setCurrentSubMenu
  ]);

  const nav = useNavigate();
  const moveSubPage = (type: string, sub_type:string, endpoint: string) => {
    setCurrentMainMenu(type);
    setCurrentSubMenu(sub_type);
    setModalType('');
    nav(endpoint);
  }
  
  if(modalType === '') return null;
  return (
    <>
      <div className={`${className}-dim`}></div>
        <div className={className}>
        {subMenu[modalType].map((menu, menuIdx: number) => {
            return (
            <span
                className={
                (currentSubMenu === menu.sub_type)
                ? 'active'
                : '' 
                }
                key={`modal-submenu-${menuIdx}`}
                onClick={() => moveSubPage(modalType, menu.sub_type, menu.endpoint)}
            >
                {menu.keyword}
            </span>
            );
        })}
        </div>
    </>
  );
}

export default SubMenuModal;