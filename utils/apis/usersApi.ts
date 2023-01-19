import { UpdateUserRequestType } from '../types/updateRequestTypes'
import { AddUserType } from '../types/addRequestTypes'
import { ec2 } from './apiConfig'
import { UserType } from '../types/responseTypes'

/** ID로 유저 정보 불러오기 */
export const getUserById = async (userId: number): Promise<UserType> => {
  const res = await ec2.get<UserType>(`/users/${userId}`)
  return res.data
}

/** 유저 정보 수정하기 */
export const updateUser = (userId: number, updateUserRequest: UpdateUserRequestType) => ec2.put(`/users/${userId}`, {
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
  isDelete: false
})