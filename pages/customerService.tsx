import MainContainer from '../components/layout/MainContainer'
import MobileCenterTitleHeader from '../components/layout/mobileHeader/MobileCenterTitleHeader'
import React, { useState } from 'react'
import { CsType, postCSContent, ReportType } from '../utils/airtableConfig'
import { useRouter } from 'next/router'
import { useRedirectIfNotSignIn } from '../hooks/useRedirectIfNotSignIn'
import { useSignInInfoStore } from '../stores/localStorageStore/stores'
import { useSnackbarOpenStore } from '../stores/stores'
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { useQuery } from 'react-query'
import { getOtherUserById } from '../utils/apis/usersApi'

const CustomerService = () => {
  const router = useRouter()
  const { userId, setUserId, oauthId, setOauthId } = useSignInInfoStore()
  const type: string | undefined = router.query.type as string | undefined
  const reportType: ReportType | undefined = router.query.reportType as ReportType | undefined
  const reportedId: number | undefined = router.query.reportedId as number | undefined
  const reportedInfo: string | undefined = router.query.reportedInfo as string | undefined
  const [csType, setCsType] = useState<CsType>(type === '신고' ? '신고' : '문의')
  const [content, setContent] = useState<string>('')
  const { setMessage, setIsSnackbarOpen } = useSnackbarOpenStore()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { data: userInfo } = useQuery(
    ['userInfo', userId],
    () => getOtherUserById(userId!),
    {
      enabled: !!userId
    }
  )

  // 로그인하지 않은 경우 Redirect
  useRedirectIfNotSignIn(router, userId, oauthId, setMessage, setIsSnackbarOpen)

  const submitCSContent = async () => {
    if (userId && oauthId) {
      if (content.length > 10) {
        console.log("reportedId : ", reportedId)
        await setIsLoading(true)
        await postCSContent(csType, userId, userInfo?.nickname, content, reportType, reportedId)
        await setMessage('전송이 완료되었습니다! 감사합니다 😙')
        await setIsSnackbarOpen(true)
        router.back()
      } else {
        await setMessage('10자 이상 입력해주세요.')
        await setIsSnackbarOpen(true)
      }
    } else {
      await setMessage('로그인 오류! 재로그인 후 시도해주세요.')
      await setIsSnackbarOpen(true)
      await setUserId(null)
      await setOauthId(null)
      await router.replace('/')
    }
  }

  return (
    <MainContainer isHiddenHeaderAndFooterOnMobile={true}>
      <MobileCenterTitleHeader router={router} title='고객센터' />

      <main className='marginHeader py-4 px-5 space-y-4 lg:py-8 lg:space-y-6 lg:mainWidthLimit'>
        {type === '신고' ? (
          <>
            <h2 className='text-xl font-semibold text-black lg:text-3xl'>🚨 신고하기</h2>
            <div className='p-2 border border-gray-400 bg-white rounded text-base font-medium text-gray-800 lg:p-3 lg:text-lg'>
              <p>{`<신고 ${reportType}>`}</p>
              <p className='mt-2 p-1 border border-gray-200 rounded text-gray-400 lg:p-2'>{reportedInfo}</p>
            </div>
          </>
        ) : (
          <FormControl fullWidth>
            <InputLabel>문의 유형</InputLabel>
            <Select
              value={csType}
              label='문의 유형'
              onChange={(e) => setCsType(e.target.value as CsType)}
            >
              <MenuItem value='문의'>문의</MenuItem>
              <MenuItem value='건의'>건의</MenuItem>
            </Select>
          </FormControl>
        )}
        <TextField
          className='w-full'
          multiline
          rows={20}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={type === '신고' ? '신고 사유를 자세히 입력해주세요.' : '문의/건의 내용을 입력해주세요.'}
        />
        <button
          onClick={submitCSContent}
          className={'w-full py-4 rounded-lg text-base font-bold lg:mt-20 lg:text-lg'
            + (content.length > 10 ? ' bg-blue-500 text-gray-50 shadow-button' : ' bg-gray-200 text-gray-400')}
        >
          전송하기
        </button>
      </main>

    </MainContainer>
  )
}

export default CustomerService