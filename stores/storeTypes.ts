export type ScrollYState = {
  scrollY: number
  setScrollY: (scrollY: number) => void
}

export type SnackbarOpenState = {
  isSnackbarOpen: boolean
  setIsSnackbarOpen: (isSnackbarOpen: boolean) => void
  message: string
  setMessage: (message: string) => void
}