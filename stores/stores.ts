import { create } from 'zustand'
import { ScrollYState, SnackbarOpenState } from './storeTypes'

/** 스크롤 Y값을 저장하는 Store */
export const useScrollYStore = create<ScrollYState>((set) => ({
  scrollY: 0,
  setScrollY: (scrollY: number) => {
    set((state) => ({ ...state, scrollY: scrollY }))
  }
}))

/** 스낵바 띄우는 Store */
export const useSnackbarOpenStore = create<SnackbarOpenState>((set) => ({
  isSnackbarOpen: false,
  setIsSnackbarOpen: (isSnackbarOpen: boolean) => {
    set((state) => ({ ...state, isSnackbarOpen: isSnackbarOpen }))
  },
  message: '',
  setMessage: (message: string) => {
    set((state) => ({ ...state, message: message }))
  }
}))