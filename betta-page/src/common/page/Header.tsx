import '../css/header.scss';
import { useNavigate } from 'react-router-dom';
import { useCommStore } from '../store/useCommStore.ts';
import React, { useEffect, useRef } from 'react';
import { useMenuStore } from '../store/useMenuStore.ts';
import SubMenuModal from './SubMenuModal.tsx';

const MenuList = ({ className, setModalType }: { className:string, setModalType:(type: string) => void }) => {
  const closeBtnRef = useRef<HTMLButtonElement>(null);
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
    nav(endpoint);
    closeBtnRef.current?.click();
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
          ref={closeBtnRef}
          className='no-border-btn'
          dangerouslySetInnerHTML={{ __html: '닫기 < '}}
          onClick={() => closeDiv()}
          style={{ marginBottom: '10px' }}
        />
      </div>
      <SubMenuModal className='modal' closeBtnRef={closeBtnRef} />
    </>
  )
}

const Header = () => {
  const headerMainDivRef = useRef<HTMLDivElement>(null);
  const openBtnRef = useRef<HTMLButtonElement>(null);
  const [ searchBtnRef, searchTextRef ] = [useRef<HTMLButtonElement>(null), useRef<HTMLInputElement>(null) ];

  const [ modalType, setModalType ] = useCommStore(state => [
    state.modalType,
    state.setModalType
  ])


  const openMenu = () => {
    if(openBtnRef.current?.classList.contains('active')) {
      (document.querySelector('.common-header') as HTMLDivElement).style.width = '0';
      (document.querySelector('.common-header') as HTMLDivElement).style.opacity = '0';
    } else {
      (document.querySelector('.common-header') as HTMLDivElement).style.width = '';
      (document.querySelector('.common-header') as HTMLDivElement).style.opacity = '';
    }
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

  const search = () => {
    if(searchBtnRef.current?.classList.contains('search-active')) {
      // do search
    } else {
      searchBtnRef.current?.classList.add('search-active');
      if(searchTextRef.current) {
        searchTextRef.current.style.width = '15rem';
        searchTextRef.current.style.paddingRight = '40px';
      }
        
    }
  }

  return (
    <>
      <span className='main-icon'>
        <button 
          ref={openBtnRef}
          className='no-border-btn btn-menu'
          dangerouslySetInnerHTML={{ __html: '열기 > ' }}
          onClick={() => openMenu()}
        />
        <span>로고.</span>
        <input type='text' className='search-object search-box' ref={searchTextRef}/>
        <button className='no-border-btn search-object' ref={searchBtnRef} onClick={() => search()}>검색</button>
      </span>
      <div id='header' className='common-header' ref={headerMainDivRef} style={{ opacity: 0, width: 0 }}>
        <MenuList className='common-header_menu' setModalType={setModalType} />
      </div>
    </>
  )
}

export default Header;