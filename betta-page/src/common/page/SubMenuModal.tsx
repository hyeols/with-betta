import React, { useEffect, useRef } from 'react';
import { useCommStore } from '../store/useCommStore.ts';
import { useMenuStore } from '../store/useMenuStore.ts';
import { useNavigate } from 'react-router-dom';


const SubMenuModal = ({ className }: { className: string }) => {
  const [ modalRef, modalDimRef ] = [ useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null) ];
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

  useEffect(() => {
    if(modalRef.current && modalDimRef.current) {
      modalDimRef.current.style.top = modalRef.current?.style.height;
    }
  }, [modalType, modalRef.current?.style.height])
  
  if(modalType === '') return null;
  return (
    <>
      <div className={`${className}-dim`} ref={modalDimRef}>
          
      </div>
        <div className={className} ref={modalRef}>
        {subMenu[modalType]?.map((menu, menuIdx: number) => {
            return (
            <span
                className={
                  ((currentSubMenu === menu.sub_type)
                  ? 'active'
                  : '') + ((true) ? ' as' : '')
                }
                key={`modal-submenu-${menuIdx}`}
                onClick={() => moveSubPage(modalType, menu.sub_type, menu.endpoint)}
            >
                {menu.keyword}
            </span>
            );
        })}
          {/* <button className='modal-close' onClick={() => setModalType('')}>X</button> */}
        </div>
    </>
  );
}

export default SubMenuModal;