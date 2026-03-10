import { useShallow } from 'zustand/react/shallow'
import { useNaviStore } from '.'

export function useNaviState() {
  return useNaviStore(
    useShallow((state) => ({
      isMenuOpen: state.isMenuOpen,
      isScrollDown: state.isScrollDown,
    })),
  )
}

export function useGetIsScrollDown() {
  return useNaviStore((state) => state.isScrollDown)
}

export function useMenuOff() {
  return useNaviStore((state) => state.menuOff)
}

export function useMenuOnOff() {
  return useNaviStore((state) => state.menuOnOff)
}

export function useIsScrollDown() {
  return useNaviStore(
    useShallow((state) => ({
      isScrollDown: state.isScrollDown,
      handleSetIsScrollDown: state.scrollDown,
    })),
  )
}
