import { AddBlockUserLogType } from '../types/addRequestTypes'
import { ec2 } from './apiConfig'
import { DeleteBlockUserLogType } from '../types/deleteRequestTypes'

/** 유저 차단하기 */
export const addBlockUserLog = async (addBlockUserLogRequest: AddBlockUserLogType, blockUserIdList: number[], setBlockUserIdList: (blockUserIdList: number[]) => void) => ec2.post('/blockUserLog', {
  userId: addBlockUserLogRequest.userId,
  blockUserId: addBlockUserLogRequest.blockUserId
}).then(() => {
  if (!blockUserIdList.includes(addBlockUserLogRequest.blockUserId)) {
    setBlockUserIdList(blockUserIdList.concat(addBlockUserLogRequest.blockUserId))
  }
})

/** 유저 차단 해제하기 */
export const deleteBlockUserLog = (deleteBlockUserLogRequest: DeleteBlockUserLogType, blockUserIdList: number[], setBlockUserIdList: (blockUserIdList: number[]) => void) =>
  ec2.delete(`/blockUserLog?userId=${deleteBlockUserLogRequest.userId}&blockUserId=${deleteBlockUserLogRequest.blockUserId}`).then(() => {
    setBlockUserIdList(blockUserIdList.filter((blockUserId) => blockUserId !== deleteBlockUserLogRequest.blockUserId))
  })