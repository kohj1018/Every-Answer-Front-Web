import { useEffect } from 'react'
import { NextRouter } from 'next/router'

export function useRedirectIfSignIn(
  router: NextRouter,
  userId: number | null,
  oauthId: string | null,
  setMessage: (message: string) => void,
  setIsSnackbarOpen: (isSnackbarOpen: boolean) => void,
  setIsLoading: ((isLoading: boolean) => void) | null = null
): void {

  // 이미 로그인을 한 경우 Redirect
  useEffect(() => {
    if (userId && oauthId) {
      ;(async () => {
        await setMessage('이미 로그인 되어 있습니다.')
        await setIsSnackbarOpen(true)
        await router.replace('/')
      })()
    }
    if (!!setIsLoading) {
      setIsLoading(false)
    }
  }, [userId, oauthId])
}