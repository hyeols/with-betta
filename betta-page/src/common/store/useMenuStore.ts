import { create } from 'zustand';

type main_menu_type = {
  [type:string]: string;
}

type sub_menu_type = {
  [type:string]: { name: string, endpoint: string }[];
}

interface IMenuStore {
  mainMenu: main_menu_type;
  subMenu: sub_menu_type;
  currentMainMenu: string;
  currentSubMenu: string;
  setCurrentMainMenu: (currentMainMenu?: string) => void;
  setCurrentSubMenu: (currentSubMenu?: string) => void;
  setMenuInitialState: () => void;
}


const main_menu_list: main_menu_type = {
  '베타': '/betta',
  '금붕어': '/goldfish' ,
  '구피': '/guppy' ,
  '거북이': '/turtle' ,
  '수초': '/plants' ,
  '용품': '/others',
  '고객센터': '/center',
  '마이페이지': '/mypage'
};

const getSubMenu = () => {
  const result:sub_menu_type = {};

  for(const type in main_menu_list) {
    if(result[type] === undefined) result[type] = [];
    
    const main_endpoint = main_menu_list[type];
    switch(type) {
      case '베타':
        result[type].push({ name: '하프문', endpoint: main_endpoint + '/halfmoon' });
        result[type].push({ name: '플라캇', endpoint: main_endpoint + '/plakat'});
        result[type].push({ name: '크라운', endpoint: main_endpoint + '/crown'});
        result[type].push({ name: '베일', endpoint: main_endpoint + '/veil'});
        result[type].push({ name: '더블테일', endpoint: main_endpoint + '/doubletail'});
        break;
      case '금붕어': 
        result[type].push({ name: '난주', endpoint: main_endpoint + '/nanju' });
        result[type].push({ name: '오란다', endpoint: main_endpoint + '/oranda'});
        break;
      case '구피': 
        result[type].push({ name: '레드', endpoint: main_endpoint + '/red' });
        result[type].push({ name: '블랙', endpoint: main_endpoint + '/black' });
        result[type].push({ name: '옐로우', endpoint: main_endpoint + '/yellow' });
        break;
      case '거북이': 
        result[type].push({ name: '늑대거북이', endpoint: main_endpoint + '/wolf' });
        result[type].push({ name: '사막거북이', endpoint: main_endpoint + '/dessert' });
        break;
      case '수초':
        result[type].push({ name: '전경수초', endpoint: main_endpoint + '/front' });
        result[type].push({ name: '중경수초', endpoint: main_endpoint + '/middle' });
        result[type].push({ name: '후경수초', endpoint: main_endpoint + '/back' });
        break;
      case '용품':
        result[type].push({ name: '여과기', endpoint: main_endpoint + '/filter' });
        result[type].push({ name: '온도계/히터', endpoint: main_endpoint + '/heat' });
        result[type].push({ name: '조명', endpoint: main_endpoint + '/light' });
        break;
      case '고객센터': 
        result[type].push({ name: '공지사항', endpoint: main_endpoint + '/notice' });
        result[type].push({ name: '1:1 문의', endpoint: main_endpoint + '/contact' });
        break;
      case '마이페이지': 
        result[type].push({ name: '정보 수정', endpoint: main_endpoint + '/edit' });
        result[type].push({ name: '주문 현황', endpoint: main_endpoint + '/order' });
        break;
    }
  }

  return result;
}
  
const initialValue = {
  mainMenu: main_menu_list,
  subMenu: getSubMenu(),
  currentMainMenu: '',
  currentSubMenu: ''
}

export const useMenuStore = create<IMenuStore>((set) => ({
  ...initialValue,
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