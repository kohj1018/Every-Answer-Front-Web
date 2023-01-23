import { ec2 } from '../apiConfig'
import { AddLikeLogAnswerPostType } from '../../types/addRequestTypes'
import { DeleteLikeLogAnswerPostType } from '../../types/deleteRequestTypes'

/** 사용자가 추천을 눌렀는지 확인하기 (return이 true면 눌렀다는 거) */
export const getLikeLogAnswerPost = async (answerPostId: number, userId: number): Promise<boolean> => {
  const res = await ec2.get<boolean>(`/likeLogAnswerPosts?answerPostId=${answerPostId}&userId=${userId}`)
  return res.data
}

/** 추천 누르기 (추천 기록 추가하기) */
export const addLikeLogAnswerPost = (addLikeLogAnswerPostRequest: AddLikeLogAnswerPostType) => ec2.post('/likeLogAnswerPosts', {
  answerPostId: addLikeLogAnswerPostRequest.answerPostId,
  userId: addLikeLogAnswerPostRequest.userId
})

/** 추천 취소하기 (추천 기록 제거하기) */
export const deleteLikeLogAnswerPost = (deleteLikeLogAnswerPostRequest: DeleteLikeLogAnswerPostType) => ec2.delete(`/likeLogAnswerPosts?answerPostId=${deleteLikeLogAnswerPostRequest.answerPostId}&userId=${deleteLikeLogAnswerPostRequest.userId}`)