import { create } from 'zustand'
import { BlockUserIdListPersist, BlockUserIdListState, SignInInfoPersist, SignInInfoState } from './storeTypes'
import { persist } from 'zustand/middleware'

/** 유저 아이디와 OAuth에서 받은 id를 저장하는 Store */
export const useSignInInfoStore = create<SignInInfoState>(
  (persist as SignInInfoPersist)(
    (set) => ({
      userId: null,
      setUserId: (userId: number | null) => {
        set((state) => ({...state, userId: userId}))
      },
      oauthId: null,
      setOauthId: (oauthId: string | null) => {
        set((state) => ({...state, oauthId: oauthId}))
      }
    }),
    {
      name: 'signInInfo'
    }
  )
)

/** 차단한 유저의 id들을 저장하는 Store */
export const useBlockUserIdListStore = create<BlockUserIdListState>(
  (persist as BlockUserIdListPersist)(
    (set) => ({
      blockUserIdList: [],
      setBlockUserIdList: (blockUserIdList: number[]) => {
        set((state) => ({...state, blockUserIdList: blockUserIdList}))
      }
    }),
    {
      name: 'blockUserIdList'
    }
  )
)