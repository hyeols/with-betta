import '../css/header.scss';
import { useNavigate } from 'react-router-dom';
import { useCommStore } from '../store/useCommStore.ts';
import React, { MouseEventHandler, useEffect } from 'react';
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
    menu_list.push({ type: menu, keyword: mainMenu[menu].keyword, endpoint: mainMenu[menu].endpoint })
  }
  const nav = useNavigate();
  const movePage = (type: string, endpoint: string) => {
    setCurrentMainMenu(type);
    setCurrentSubMenu('');
    setModalType('');
    nav(endpoint);
  }
  return (
    <div className={className}>
      { menu_list.map((menu, menuIdx: number) => {
          return (
            <span 
              key={`header-menu-${menuIdx}`}
              onMouseOver={() => setModalType(menu.type)}
              onClick={() => movePage(menu.type, menu.endpoint)}
            >
              {menu.keyword}
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
    const handleModal = (event:MouseEvent) => {
      const target = event.target as HTMLElement;
      if(!target.closest('.common-header') || target.classList.contains('modal-dim')) {
        setModalType('');
      }
    }
    document.body.addEventListener('mouseover', handleModal);
    return () => { document.body.removeEventListener('mouseover', handleModal) }
  }, [])
  return (
    <>
    <span className='main-icon'>로고</span>
    <div id='header' className='common-header'>
      <MenuList className='common-header_menu' setModalType={setModalType} />
      <SubMenuModal className='modal'/>
    </div>
    </>
  )
}

export default Header;