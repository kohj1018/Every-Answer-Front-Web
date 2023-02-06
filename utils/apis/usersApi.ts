import { UpdateUserRequestType } from '../types/updateRequestTypes'
import { AddUserType } from '../types/addRequestTypes'
import { ec2 } from './apiConfig'
import { OtherUserType, UserType } from '../types/responseTypes'

/** OauthId로 유저 정보 불러오기 */
export const getUserByOauthId = async (oauthId: string): Promise<UserType> => {
  const res = await ec2.get<UserType>(`/users/${oauthId}`)
  return res.data
}

/** OauthId로 유저 Id 불러오기 */
export const getUserIdByOauthId = async (oauthId: string): Promise<number> => {
  const res = await ec2.get<number>(`/users/findUserId/${oauthId}`)
  return res.data
}

/** nickname 중복확인 */
export const checkNicknameDuplicate = async (nickname: string): Promise<boolean> => {
  const res = await ec2.get<boolean>(`/users/nicknameCheck/${nickname}`)
  return res.data
}

/** 유저 정보 수정하기 */
export const updateUser = (oauthId: string, updateUserRequest: UpdateUserRequestType) => ec2.put(`/users/${oauthId}`, {
  deptId: updateUserRequest.deptId,
  nickname: updateUserRequest.nickname,
  deptName: updateUserRequest.deptName,
  univ: updateUserRequest.univ,
  entranceYear: updateUserRequest.entranceYear,
  oauthId: updateUserRequest.oauthId,
  refreshToken: updateUserRequest.refreshToken,
  isDelete: updateUserRequest.isDelete
})

/** 새 유저 추가하기 */
export const addUser = (addUserRequest: AddUserType) => ec2.post('/users', {
  deptId: addUserRequest.deptId,
  nickname: addUserRequest.nickname,
  deptName: addUserRequest.deptName,
  univ: addUserRequest.univ,
  entranceYear: addUserRequest.entranceYear,
  oauthId: addUserRequest.oauthId,
  refreshToken: addUserRequest.refreshToken,
  isDelete: false,
  agreeTerms: addUserRequest.agreeTerms,
  isCertified: addUserRequest.isCertified
})

/** 다른 유저의 정보 ID로 불러오기 (제한된 정보) */
export const getOtherUserById = async (otherUserId: number): Promise<OtherUserType> => {
  const res = await ec2.get<OtherUserType>(`/users/other/${otherUserId}`)
  return res.data
}