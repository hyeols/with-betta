import { create } from 'zustand';

type menu_type_list = {
  type: string,
  keyword: string
}[]
type main_menu_type = {
  [type:string]: { keyword: string, endpoint: string };
}

type sub_menu_type = {
  [type:string]: { sub_type:string, keyword: string, endpoint: string }[];
}

type arr_menu_type = [ main_menu_type, sub_menu_type ];

interface IMenuStore {
  mainMenu: main_menu_type;
  subMenu: sub_menu_type;
  currentMainMenu: string;
  currentSubMenu: string;
  setCurrentMainMenu: (currentMainMenu?: string) => void;
  setCurrentSubMenu: (currentSubMenu?: string) => void;
  setMenuInitialState: () => void;
}

const menu_list: menu_type_list = [
  { type: 'betta', keyword: '베타' },
  { type: 'goldfish', keyword: '금붕어' },
  { type: 'guppy', keyword: '구피' },
  { type: 'turtle', keyword: '거북이' },
  { type: 'plants', keyword: '수초' },
  { type: 'others', keyword: '용품' },
  { type: 'center', keyword: '고객센터' },
  { type: 'mypage', keyword: '마이페이지' }
];

const getMenu = () => {

  const main_menu:main_menu_type = {};
  menu_list.map((menu) => {
    main_menu[menu.type] = { keyword: menu.keyword, endpoint: '/list/' + menu.type };
  })

  const sub_menu:sub_menu_type = getSubMenu(main_menu);
  const result: arr_menu_type = [ main_menu, sub_menu ]
  return result;
}

const getSubMenu = (main_menu: main_menu_type) => {
  const result:sub_menu_type = {};
  
  for(const type in main_menu) {    
    let sub_menu_list:menu_type_list = [];
    switch(type) {
      case 'betta':
        sub_menu_list.push({ type: 'halfmoon', keyword: '하프문' });
        sub_menu_list.push({ type: 'plakat', keyword: '플라캇' });
        sub_menu_list.push({ type: 'crown', keyword: '크라운' });
        sub_menu_list.push({ type: 'veil', keyword: '베일' });
        sub_menu_list.push({ type: 'doubletail', keyword: '더블테일' });
        break;
      case 'goldfish': 
        sub_menu_list.push({ type: 'nanju', keyword: '난주' });
        sub_menu_list.push({ type: 'oranda', keyword: '오란다' });
        break;
      case 'guppy': 
        sub_menu_list.push({ type: 'red', keyword: '레드' });
        sub_menu_list.push({ type: 'black', keyword: '블랙' });
        sub_menu_list.push({ type: 'yellow', keyword: '옐로우' });
        break;
      case 'turtle': 
        sub_menu_list.push({ type: 'wolf', keyword: '늑대거북이' });
        sub_menu_list.push({ type: 'dessert', keyword: '사막거북이' });
        break;
      case 'plants':
        sub_menu_list.push({ type: 'front', keyword: '전경수초' });
        sub_menu_list.push({ type: 'middle', keyword: '중경수초' });
        sub_menu_list.push({ type: 'back', keyword: '후경수초' });
        break;
      case 'others':
        sub_menu_list.push({ type: 'filter', keyword: '여과기' });
        sub_menu_list.push({ type: 'heat', keyword: '온도계/히터' });
        sub_menu_list.push({ type: 'light', keyword: '조명' });
        break;
      case 'center': 
        sub_menu_list.push({ type: 'notice', keyword: '공지사항' });
        sub_menu_list.push({ type: 'contact', keyword: '1:1 문의' });
        break;
      case 'mypage': 
        sub_menu_list.push({ type: 'edit', keyword: '정보 수정' });
        sub_menu_list.push({ type: 'order', keyword: '주문 현황' });
        break;
    }

    const main_endpoint = main_menu[type].endpoint;
    if(result[type] === undefined) result[type] = [];
    sub_menu_list.map((sub_menu) => {
      result[type].push({ sub_type: sub_menu.type, keyword: sub_menu.keyword, endpoint: main_endpoint + '/' + sub_menu.type })
    })
  }

  return result;
}
  
const initialValue = () => {
  const menu = getMenu();
  return {
    mainMenu: menu[0],
    subMenu: menu[1],
    currentMainMenu: '',
    currentSubMenu: ''
  }
}

export const useMenuStore = create<IMenuStore>((set) => ({
  ...initialValue(),
  setCurrentMainMenu: (currentMainMenu) => {
    set((state) => ({
      currentMainMenu: currentMainMenu ?? state.currentMainMenu
    }))
  },
  setCurrentSubMenu: (currentSubMenu) => {
    set((state) => ({
      currentSubMenu: currentSubMenu ?? state.currentSubMenu
    }))
  },
  setMenuInitialState: () => set(initialValue)
}))