import { AddBlockUserLogType } from '../types/addRequestTypes'
import { ec2 } from './apiConfig'
import { DeleteBlockUserLogType } from '../types/deleteRequestTypes'

/** 유저 차단하기 */
export const addBlockUserLog = (addBlockUserLogRequest: AddBlockUserLogType) => ec2.post('/blockUserLog', {
  userId: addBlockUserLogRequest.userId,
  blockUserId: addBlockUserLogRequest.blockUserId
})

/** 유저 차단 해제하기 */
export const deleteBlockUserLog = (deleteBlockUserLogRequest: DeleteBlockUserLogType) => ec2.delete(`/blockUserLog?userId=${deleteBlockUserLogRequest.userId}&blockUserId=${deleteBlockUserLogRequest.blockUserId}`)