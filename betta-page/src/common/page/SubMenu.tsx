import React, { useEffect, useRef, useState } from 'react';
import { useMenuStore } from '../store/useMenuStore.ts';


const SubMenu = ({ className }: { className: string }) => {
  const [ subMenu, currentMainMenu, currentSubMenu ] = useMenuStore((state) => [
    state.subMenu,
    state.currentMainMenu,
    state.currentSubMenu
  ]);
  const leftMenuDivRef = useRef<HTMLDivElement>(null);
  const [ isChangeLeftMenu, setIsChangeLeftMenu ] = useState(false);
  useEffect(() => {
    if(currentMainMenu !== '') {
      setIsChangeLeftMenu(true);
    } else {
      setIsChangeLeftMenu(false);
    }
  }, [currentMainMenu])

  useEffect(() => {
    if(currentMainMenu !== '') {
      setIsChangeLeftMenu(true);
    } else {
      setIsChangeLeftMenu(false);
    }
  }, [currentSubMenu])

  return (
    <>
    { isChangeLeftMenu
      ? <div className={className} ref={leftMenuDivRef}>
          {subMenu[currentMainMenu].map((menu, menuIdx: number) => {
            return (
              <span
                key={`leftmenu-sub-${menuIdx}`}
                className={ menu.sub_type === currentSubMenu ? 'active' : '' }
              >
                {menu.keyword}
              </span>
            );
          })}
        </div>
      : null
    }
    </>
  );
}

export default SubMenu;