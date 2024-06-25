import '../css/header.scss';
import { useNavigate } from 'react-router-dom';
import { useCommStore } from '../store/useCommStore.ts';
import React, { useEffect, useState } from 'react';
import { useMenuStore } from '../store/useMenuStore.ts';
import SubMenuModal from './SubMenuModal.tsx';

const MenuList = ({ className, setModalType }: {className:string, setModalType:(type: string) => void}) => {
  const [ mainMenu, setCurrentMainMenu, setCurrentSubMenu ] = useMenuStore((state => [
    state.mainMenu,
    state.setCurrentMainMenu,
    state.setCurrentSubMenu
  ]));

  const menu_list:any = [];
  for(const menu in mainMenu) {
    menu_list.push({ name: menu, endpoint: mainMenu[menu] })
  }
  const nav = useNavigate();
  const movePage = (name: string, endpoint: string) => {
    setCurrentMainMenu(name);
    setCurrentSubMenu('');
    setModalType('');
    nav(endpoint);
  }

  const handleMouseOver = (name: string) => {
    setModalType(name);
    
  }


  return (
    <div className={className}>
      { menu_list.map((menu, menuIdx: number) => {
          return (
            <span 
              key={`header-menu-${menuIdx}`}
              onMouseOver={() => setModalType(menu.name)}
              onClick={() => movePage(menu.name, menu.endpoint)}
            >
              {menu.name}
            </span>
          )
        })}
    </div>
  )
}

const Header = () => {
  const [ modalType, setModalType ] = useCommStore(state => [
    state.modalType,
    state.setModalType
  ])
  useEffect(() => {
    if(modalType === '') {
      (document.querySelector('.common-body') as HTMLDivElement).style.marginTop = '75px';
    } else {
      (document.querySelector('.common-body') as HTMLDivElement).style.marginTop = '150px';
    }
  }, [modalType])
  return (
    <>
    <div id='header' className='common-header'>
      <span className='common-header_main-icon'></span>
      <MenuList className='common-header_menu' setModalType={setModalType} />
    </div>
    <SubMenuModal className='modal'/>
    </>
  )
}

export default Header;