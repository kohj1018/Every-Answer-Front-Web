import { AnswerPostType } from '../types/responseTypes'
import { ec2 } from './apiConfig'

/** 질문글 ID에 달린 답변글 모두 불러오기 */
export const getAnswerPostListByQuestionPostId = async (questionPostId: number): Promise<AnswerPostType[]> => {
  const res = await ec2.get<AnswerPostType[]>(`/answerPosts?questionPostId=${questionPostId}`)
  return res.data
}