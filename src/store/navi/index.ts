import { create } from 'zustand'

export interface NaviStoreState {
  isMenuOpen: boolean
  isScrollDown: boolean
  menuOnOff: () => void
  menuOff: () => void
  scrollDown(payload: boolean): void
}

export const useNaviStore = create<NaviStoreState>((set) => ({
  isMenuOpen: false,
  isScrollDown: false,
  menuOnOff: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
  menuOff: () => set({ isMenuOpen: false }),
  scrollDown: (payload) => set({ isScrollDown: payload }),
}))
