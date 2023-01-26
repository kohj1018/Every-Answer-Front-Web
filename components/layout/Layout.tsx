// 모든 Next Page에 root 태그로 들어가게 되는 Layout 컴포넌트 (_app.tsx 참조)
// Page에만 넣을 css 요소들 여기에 넣기
import React from 'react'
import BottomCenterSnackbar from '../common/BottomCenterSnackbar'
import { useSnackbarOpenStore } from '../../stores/stores'

interface Props {
  children: React.ReactNode
}

function Layout({ children }: Props) {
  const { isSnackbarOpen, setIsSnackbarOpen, message } = useSnackbarOpenStore()

  return <div className='min-h-screen h-full min-w-[300px] w-full bg-white'>
    {children}
    <BottomCenterSnackbar isSnackbarOpen={isSnackbarOpen} setIsSnackbarOpen={setIsSnackbarOpen} message={message} />
  </div>
}

export default Layout