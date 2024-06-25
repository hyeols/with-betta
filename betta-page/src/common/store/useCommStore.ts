import { create } from 'zustand';

interface ICommStore {
  modalType: string;
  setModalType: (modalType?: string) => void;
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
  }
}))