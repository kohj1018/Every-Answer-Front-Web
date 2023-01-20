import { AnswerPostType } from '../types/responseTypes'
import { ec2 } from './apiConfig'
import { UpdateAnswerPostRequestType } from '../types/updateRequestTypes'
import { AddAnswerPostType, AddQuestionPostType } from '../types/addRequestTypes'

/** 질문글 ID에 달린 답변글 모두 불러오기 */
export const getAnswerPostListByQuestionPostId = async (questionPostId: number): Promise<AnswerPostType[]> => {
  const res = await ec2.get<AnswerPostType[]>(`/answerPosts?questionPostId=${questionPostId}`)
  return res.data
}

export const updateAnswerPost = (answerPostId: number, updateAnswerPostRequest: UpdateAnswerPostRequestType) => ec2.put(`/answerPosts/${answerPostId}`, {
  content: updateAnswerPostRequest.content
})

export const addAnswerPost = (addAnswerPostRequest: AddAnswerPostType) => ec2.post('/answerPosts', {
  questionPostId: addAnswerPostRequest.questionPostId,
  userId: addAnswerPostRequest.userId,
  likeNum: 0, // default 0
  content: addAnswerPostRequest.content
})