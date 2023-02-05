import { StateCreator } from 'zustand'
import { PersistOptions } from 'zustand/middleware/persist'

export type SignInInfoState = {
  userId: number | null
  setUserId: (userId: number | null) => void
  oauthId: string | null
  setOauthId: (OauthId: string | null) => void
}
export type SignInInfoPersist = (
  config: StateCreator<SignInInfoState>,
  options: PersistOptions<SignInInfoState>
) => StateCreator<SignInInfoState>

export type BlockUserIdListState = {
  blockUserIdList: number[]
  setBlockUserIdList: (blockUserIdList: number[]) => void
}
export type BlockUserIdListPersist = (
  config: StateCreator<BlockUserIdListState>,
  options: PersistOptions<BlockUserIdListState>
) => StateCreator<BlockUserIdListState>