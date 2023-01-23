import { UpdateQuestionPostRequestType } from '../types/updateRequestTypes'
import { AddQuestionPostType } from '../types/addRequestTypes'
import { ec2 } from './apiConfig'
import { INFINITE_SCROLL_LOAD_SIZE } from '../config'
import { QuestionPostType } from '../types/responseTypes'

/** ID로 질문글 불러오기 */
export const getQuestionPostById = async (questionPostId: number): Promise<QuestionPostType> => {
  const res = await ec2.get<QuestionPostType>(`/questionPosts/${questionPostId}`)
  return res.data
}

/** 질문글 무한 스크롤 */
export const getInfiniteQuestionPostList = async (lastPostId: number) => {
  const res = await ec2.get<QuestionPostType[]>(`/questionPosts?lastPostId=${lastPostId}&size=${INFINITE_SCROLL_LOAD_SIZE}`)
  const postList: QuestionPostType[] = res.data
  return { postList, nextLastPostId: postList[postList.length - 1].questionPostId, isLast: postList.length < 20 }
}

/** 질문글 검색하기 */
export const searchQuestionPostList = async (searchTerm: string): Promise<QuestionPostType[]> => {
  const res = await ec2.get<QuestionPostType[]>(`/questionPosts/search/${searchTerm}`)
  return res.data
}

/** 질문글 수정하기 */
export const updateQuestionPost = (questionPostId: number, updateQuestionPostRequest: UpdateQuestionPostRequestType) => ec2.put(`/questionPosts/${questionPostId}`, {
  deptId: updateQuestionPostRequest.deptId,
  title: updateQuestionPostRequest.title,
  content: updateQuestionPostRequest.content
})

/** 질문글 저장하기 */
export const addQuestionPost = (addQuestionPostRequest: AddQuestionPostType) => ec2.post('/questionPosts', {
  userId: addQuestionPostRequest.userId,
  deptId: addQuestionPostRequest.deptId,
  title: addQuestionPostRequest.title,
  content: addQuestionPostRequest.content
})