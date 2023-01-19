import { Dayjs } from 'dayjs'

export interface DeptClassType {
  deptId: number
  college: string
  name: string
}

export interface UserType {
  userId: number
  deptClass: DeptClassType
  nickname: string
  deptName: string
  univ: string
  entranceYear: number
  oauthId: string
  refreshToken: string
  createdAt: string
  updatedAt: string | null
  isDelete: boolean
}

export interface QuestionPostType {
  questionPostId: number
  user: UserType
  deptClass: DeptClassType
  title: string
  content: string
  createdAt: string
  updatedAt: string | null
  answerPostsCnt: number
}

export interface AnswerPostType {
  answerPostId: number
  questionPostId: number
  user: UserType
  likeNum: number
  content: string
  createdAt: string
  updatedAt: string | null
}