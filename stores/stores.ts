import { create } from 'zustand'
import { scrollYState } from './storeTypes'

/** 스크롤 Y값을 저장하는 Store */
export const useScrollYStore = create<scrollYState>((set) => ({
  scrollY: 0,
  setScrollY: (scrollY: number) => {
    set((state) => ({ ...state, scrollY: scrollY }))
  }
}))