import { create } from 'zustand';

type messageBox_type = {
  [code:string]: string;
}
interface ICommStore {
  modalType: string;
  setModalType: (modalType?: string) => void;
  getMessage: (code:string, reason?:string) => string;
}


const messageBox: messageBox_type = {
  '404': '페이지를 찾지 못했습니다.'
}

const initialValue = {
  modalType: ''
}

export const useCommStore = create<ICommStore>((set) => ({
  ...initialValue,
  setModalType: (modalType) => {
    set((state) => ({
      modalType: modalType ?? state.modalType
    }))
  },
  getMessage: (code, reason) => {
    return messageBox[code] + ' :: ' + (reason ?? '');
  }
}))