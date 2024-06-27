import '../css/header.scss';
import { useNavigate } from 'react-router-dom';
import { useCommStore } from '../store/useCommStore.ts';
import React, { useEffect, useRef } from 'react';
import { useMenuStore } from '../store/useMenuStore.ts';
import SubMenuModal from './SubMenuModal.tsx';

const MenuList = ({ className, setModalType }: { className:string, setModalType:(type: string) => void }) => {
  const [ mainMenu, currentMainMenu, setCurrentMainMenu, setCurrentSubMenu ] = useMenuStore((state => [
    state.mainMenu,
    state.currentMainMenu,
    state.setCurrentMainMenu,
    state.setCurrentSubMenu
  ]));

  const divRef = useRef<HTMLDivElement>(null);
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

  const closeDiv = () => {
    (document.querySelector('.common-header') as HTMLDivElement).style.width = '0';
    (document.querySelector('.common-header') as HTMLDivElement).style.opacity = '0';
  }
  return (
    <>
      <div className={className} ref={divRef}>
        { menu_list.map((menu, menuIdx: number) => {
            return (
              <span 
                className={currentMainMenu === menu.type ? 'active' : ''}
                key={`header-menu-${menuIdx}`}
                onMouseOver={() => setModalType(menu.type)}
                onClick={() => movePage(menu.type, menu.endpoint)}
              >
                {menu.keyword}
              </span>
            )
          })}
        <button
          className='on-off-btn'
          dangerouslySetInnerHTML={{ __html: '닫기 < '}}
          onClick={() => closeDiv()}
        />
      </div>
    </>
  )
}

const Header = () => {
  const headerMainDivRef = useRef<HTMLDivElement>(null);
  const openBtnRef = useRef<HTMLButtonElement>(null);

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
  }, []);

  const openMenu = () => {
    (document.querySelector('.common-header') as HTMLDivElement).style.width = '';
    (document.querySelector('.common-header') as HTMLDivElement).style.opacity = '';
  }
  useEffect(() => {
    if(headerMainDivRef.current) {
      headerMainDivRef.current.addEventListener('transitionstart', (event, ) => {
        if(event.propertyName === 'opacity' && headerMainDivRef.current) {
          if(headerMainDivRef.current.style.opacity !== '0') {
            headerMainDivRef.current.style.visibility = '';
            if(openBtnRef.current) openBtnRef.current.classList.add('active');
          } else {
            if(openBtnRef.current) openBtnRef.current.classList.remove('active');
          }
        }
      });
      headerMainDivRef.current.addEventListener('transitionend', (event) => {
        if(event.propertyName === 'opacity' && headerMainDivRef.current && headerMainDivRef.current.style.opacity === '0') {
          headerMainDivRef.current.style.visibility = 'hidden';
        }
      });
    }
  }, [headerMainDivRef]);

  useEffect(() => {
    
  }, [modalType])
  return (
    <>
    <span className='main-icon'>
    <button 
      ref={openBtnRef}
      className='on-off-btn'
      dangerouslySetInnerHTML={{ __html: '열기 > ' }}
      style={{ textAlign: 'center', position: 'absolute', left: 0 }}
      onClick={() => openMenu()}
    />
      <span>로고</span>
    </span>
    <div id='header' className='common-header' ref={headerMainDivRef} style={{ opacity: 0, width: 0 }}>
      <MenuList className='common-header_menu' setModalType={setModalType} />
      <SubMenuModal className='modal'/>
    </div>
    </>
  )
}

export default Header;