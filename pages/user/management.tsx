import { NextPage } from 'next'
import MainContainer from '../../components/layout/MainContainer'
import { useRouter } from 'next/router'
import MobileCenterTitleHeader from '../../components/layout/mobileHeader/MobileCenterTitleHeader'
import React, { useState } from 'react'
import { ChevronRight, Lock, LogOut } from 'react-feather'
import { useSignInInfoStore } from '../../stores/localStorageStore/stores'
import { useSnackbarOpenStore } from '../../stores/stores'
import { MuiDialog } from '../../components/common/MuiDialog'
import { getUserById, updateUser } from '../../utils/apis/usersApi'

const Management: NextPage = () => {
  const router = useRouter()
  const { userId, setUserId, oauthId, setOauthId } = useSignInInfoStore()
  const { setMessage, setIsSnackbarOpen } = useSnackbarOpenStore()
  const [isSignOutDialogOpen, setIsSignOutDialogOpen] = useState<boolean>(false)
  const [isDeleteAccountDialogOpen, setIsDeleteAccountDialogOpen] = useState<boolean>(false)

  // 로그아웃 함수
  const signOut = async () => {
    await setUserId(null)
    await setOauthId(null)
    await setMessage('로그아웃이 완료되었습니다!')
    await setIsSnackbarOpen(true)
    await router.push('/')
  }

  // 계정 탈퇴 함수
  const deleteAccount = async () => {
    if (userId && oauthId) {
      const userData = await getUserById(userId)
      if (!!userData) {
        await updateUser(userId, {
          deptId: userData.deptClass.deptId,
          nickname: userData.nickname,
          deptName: userData.deptName,
          univ: userData.univ,
          entranceYear: userData.entranceYear,
          oauthId: userData.oauthId,
          refreshToken: userData.refreshToken,
          isDelete: true
        }).then(async () => {
          await setMessage('탈퇴가 완료되었습니다. 더 노력하는 에브리엔서가 되겠습니다.')
          await setIsSnackbarOpen(true)
          await router.push('/')
        })
      } else {
        alert('Error : 유저 정보가 존재하지 않습니다!')
        await setUserId(null)
        await setOauthId(null)
        window.location.replace('/')
      }
    } else {
      alert('탈퇴 실패. 문제가 반복되면 문의해주세요.')
      await setUserId(null)
      await setOauthId(null)
      window.location.replace('/')
    }
  }

  return (
    <MainContainer isHiddenHeaderAndFooterOnMobile={true}>
      <MobileCenterTitleHeader title='계정 관리' router={router} />

      <main className='marginHeader pt-8 px-5 lg:pt-12 lg:min-h-[60vh] lg:mainWidthLimit'>
        <section className='space-y-6'>
          <header className='text-lg font-semibold text-gray-700'>로그아웃 및 회원 탈퇴</header>
          {/* 로그아웃 */}
          <button onClick={() => setIsSignOutDialogOpen(true)} className='w-full flex items-center justify-between'>
            <div className='flex items-center space-x-3'>
              <LogOut className='w-6 h-6 text-gray-300' />
              <p className='text-base font-semibold text-gray-600'>로그아웃</p>
            </div>
            <ChevronRight className='w-6 h-6 text-gray-800' />
          </button>
          {/* 회원탈퇴 */}
          <button onClick={() => setIsDeleteAccountDialogOpen(true)} className='w-full flex items-center justify-between'>
            <div className='flex items-center space-x-3'>
              <Lock className='w-6 h-6 text-gray-300' />
              <p className='text-base font-semibold text-gray-600'>회원 탈퇴</p>
            </div>
            <ChevronRight className='w-6 h-6 text-gray-800' />
          </button>
        </section>
      </main>

      {/* 로그아웃 확인 다이얼로그 */}
      <MuiDialog
        isDialogOpen={isSignOutDialogOpen}
        setIsDialogOpen={setIsSignOutDialogOpen}
        dialogTitle='로그아웃'
        dialogContent='로그아웃하고 다시 로그인하여도 회원정보는 유지됩니다. 로그아웃 하시겠습니까?'
        executedBtnName='예'
        funcToBeExecuted={signOut}
      />

      {/* 탈퇴 확인 다이얼로그 */}
      <MuiDialog
        isDialogOpen={isDeleteAccountDialogOpen}
        setIsDialogOpen={setIsDeleteAccountDialogOpen}
        dialogTitle='회원 탈퇴'
        dialogContent='회원 탈퇴를 하더라도 계정 정보를 제외한 작성 글, 콘텐츠는 삭제되지 않습니다. 탈퇴하시겠습니까?'
        executedBtnName='예'
        funcToBeExecuted={deleteAccount}
      />
    </MainContainer>
  )
}

export default Management