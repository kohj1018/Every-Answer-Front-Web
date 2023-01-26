import { useEffect } from 'react'
import { NextRouter } from 'next/router'

export function useRedirectIfNotSignIn(
  router: NextRouter,
  userId: number | null,
  oauthId: string | null,
  setMessage: (message: string) => void,
  setIsSnackbarOpen: (isSnackbarOpen: boolean) => void
): void {
  // 로그인하지 않은 경우 Redirect
  useEffect(() => {
    if (!userId || !oauthId) {
      ;(async () => {
        await setMessage('로그인 후 이용해주세요!')
        await setIsSnackbarOpen(true)
        await router.replace('/auth/signIn')
      })()
    }
  }, [userId, oauthId])
}