import { useSignInInfoStore } from '../../stores/localStorageStore/stores'
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { addUser, checkNicknameDuplicate, getUserIdByOauthId } from '../../utils/apis/usersApi'
import MainContainer from '../../components/layout/MainContainer'
import MobileCenterTitleHeader from '../../components/layout/mobileHeader/MobileCenterTitleHeader'
import { DeptClassMinimalType } from '../../utils/constants/serviceConstants'
import MuiDeptClassComboBox from '../../components/common/MuiDeptClassComboBox'
import { Check, ChevronLeft } from 'react-feather'
import { checkCharacter } from '../../utils/functions/checkCharacter'
import { AxiosResponse } from 'axios'
import Link from 'next/link'

const SignUp = () => {
  const { userId, setUserId, oauthId, setOauthId } = useSignInInfoStore()
  const { data: session } = useSession()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [selectedDept, setSelectedDept] = useState<DeptClassMinimalType | null>(null)
  const [nickname, setNickname] = useState<string>('')
  const [isNicknameCheck, setIsNicknameCheck] = useState<boolean>(false)
  const [isDuplicate, setIsDuplicate] = useState<boolean>(true)
  const [deptName, setDeptName] = useState<string>('')
  const [univ, setUniv] = useState<string>('')
  const [entranceYearStr, setEntranceYearStr] = useState<string>('')

  // 이미 로그인을 한 경우 Redirect
  useEffect(() => {
    if (userId && oauthId) {
      window.location.replace('/')
    }
  }, [userId, oauthId])

  // 기존에 가입한 유저의 경우 로그인 처리 후 Redirect
  useEffect(() => {
    setIsLoading(true)
    console.log("session : ", session)
    if (session?.user.oauthId) {
      ;(async () => {
        const responseUserId: number = await getUserIdByOauthId(session.user.oauthId)
        if (responseUserId > -1) {  // responseUserId = -1은 해당하는 유저가 없다는 뜻. 즉, -1보다 크면 이미 가입한 유저라는 것
          setOauthId(session.user.oauthId)
          setUserId(responseUserId)
          window.location.replace('/')
        } else {
          setOauthId(session.user.oauthId)
          setIsLoading(false)
        }
      })()
    }
  }, [session])

  // 닉네임 중복 검사
  const checkDuplication = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    if (!!nickname) {
      if (checkCharacter(nickname, true)) {  // 특수문자 입력X 에만 통과
        setIsNicknameCheck(true)
        const response = await checkNicknameDuplicate(nickname)
        if (response) { // response가 true이면 중복된 아이디가 있다는 뜻
          setIsDuplicate(true)
          alert("중복된 아이디 입니다.")
        } else {
          setIsDuplicate(false)
          alert("사용 가능한 아이디입니다.")
        }
      }
    } else {
      alert("닉네임을 입력해주세요.")
    }
  }

  // 유저 가입
  const handleSignUp = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    if (!oauthId) {
      alert("oauthId 오류. 다시 시도해주세요.")
      window.location.replace('/auth/signIn')
    }

    if (!!selectedDept && nickname && !isDuplicate && deptName && univ && entranceYearStr) {
      if (checkCharacter(deptName, false) && checkCharacter(univ, false) && checkCharacter(entranceYearStr, true)) {
        if (entranceYearStr.length === 2 && parseInt(entranceYearStr) >= 0 && parseInt(entranceYearStr) < 100) {
          await addUser({
            deptId: selectedDept.deptId,
            nickname: nickname,
            deptName: deptName,
            univ: univ,
            entranceYear: parseInt(entranceYearStr),
            oauthId: oauthId ?? '',
            refreshToken: session?.refreshToken ?? ''
          }).then((response: AxiosResponse<number>) => {
            alert('가입을 축하합니다!')
            setUserId(response.data)
            setOauthId(oauthId)
            window.location.replace('/')
          })
            .catch((error) => {
              alert("오류가 발생했습니다. 다시 시도해주세요.")
              window.location.replace('/auth/signIn')
            })
        } else {
          alert("학번을 형식에 맞게 다시 입력해주세요.")
        }
      }
    }
  }



  if (isLoading) return <p>loading...</p>

  return (
    <MainContainer isHiddenHeaderAndFooterOnMobile={true}>
      <MobileCenterTitleHeader title='회원정보입력' />
      <main className='paddingHeader py-10 px-5 lg:py-[3.875rem] lg:mainWidthLimit'>
        <Link href='/' className='hidden items-center space-x-1 lg:flex'>
          <ChevronLeft className='w-5 h-5 text-gray-300' />
          <p className='text-lg font-semibold text-gray-800'>회원정보입력</p>
        </Link>

        <section className='space-y-8 text-base font-semibold text-gray-900 lg:mt-8 lg:text-xl'>
          <article className='space-y-3 lg:space-y-5'>
            <header>1. 전공을 선택해주세요.<br/><span className='text-xs text-gray-400 lg:text-sm'>가장 유사한 전공을 선택해주세요</span></header>
            <MuiDeptClassComboBox setSelectedDept={setSelectedDept} />
          </article>
          <article className='space-y-3 lg:space-y-5'>
            <header>2. 사용할 닉네임을 입력해주세요.</header>
            <form
              className='w-full px-6 py-2.5 flex items-center justify-between rounded-lg bg-gray-50 lg:px-8 lg:py-4'
            >
              <input
                type='text'
                className={'pr-1 text-base font-medium bg-gray-50 placeholder:text-gray-300 focus:outline-none lg:text-lg' + (isNicknameCheck && !isDuplicate ? ' text-gray-300' : ' text-gray-600')}
                placeholder='닉네임 입력하기'
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                disabled={!isDuplicate}
                required
              />
              <button
                className={'px-2 py-1 rounded bg-gray-200 text-sm font-semibold text-gray-500 lg:text-base'
                + (isNicknameCheck ? (isDuplicate ? ' bg-red-400 text-red-50' : ' bg-green-400 text-green-50') : '')}
                onClick={(e) => checkDuplication(e)}
              >
                {isNicknameCheck ? (isDuplicate ? '사용불가' : '사용가능') : '중복확인'}
              </button>
            </form>
          </article>
          <article className='space-y-3 lg:space-y-5'>
            <header>3. 전공의 정확한 이름을 입력해주세요.</header>
            <input
              type='text'
              className='w-full px-6 py-3 rounded-lg bg-gray-50 text-base font-medium text-gray-600 placeholder:text-gray-300 focus:outline-none lg:px-8 lg:py-4 lg:text-lg'
              placeholder='전공 이름 입력하기'
              value={deptName}
              onChange={(e) => setDeptName(e.target.value)}
              required
            />
          </article>
          <article className='space-y-3 lg:space-y-5'>
            <header>4. 대학명을 입력해주세요(캠퍼스 포함).</header>
            <input
              type='text'
              className='w-full px-6 py-3 rounded-lg bg-gray-50 text-base font-medium text-gray-600 placeholder:text-gray-300 focus:outline-none lg:px-8 lg:py-4 lg:text-lg'
              placeholder='대학명 입력하기'
              value={univ}
              onChange={(e) => setUniv(e.target.value)}
              required
            />
          </article>
          <article className='space-y-3 lg:space-y-5'>
            <header>
              5. 학번을 입력해주세요.
              <span className='ml-3 inline-flex items-center space-x-1 text-blue-500'>
                <Check className='w-3 h-3 lg:w-4 lg:h-4' />
                <p className='text-sm font-semibold lg:text-base'>ex. 20학번 → 20</p>
              </span>
            </header>
            <input
              type='number'
              className='w-full px-6 py-3 rounded-lg bg-gray-50 text-base font-medium text-gray-600 placeholder:text-gray-300 focus:outline-none lg:px-8 lg:py-4 lg:text-lg'
              placeholder='학번 입력하기'
              maxLength={2}
              value={entranceYearStr}
              onChange={(e) => {
                if (e.target.value.length > 2) {
                  e.target.value = e.target.value.slice(0, 2)
                }
                setEntranceYearStr(e.target.value)
              }}
              required
            />
          </article>
        </section>

        <button
          onClick={(e) => handleSignUp(e)}
          className={'mt-[3.25rem] w-full py-4 rounded-lg text-base font-bold lg:mt-20 lg:text-lg'
         + (!!selectedDept && !isDuplicate && deptName && univ && entranceYearStr ? ' bg-blue-500 text-gray-50 shadow-button' : ' bg-gray-200 text-gray-400')}
        >
          가입 완료
        </button>
      </main>
    </MainContainer>
  )
}

export default SignUp