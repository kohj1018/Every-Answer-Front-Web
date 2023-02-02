export interface AddUserType {
  deptId: number
  nickname: string
  deptName: string
  univ: string
  entranceYear: number
  oauthId: string
  refreshToken: string
  agreeTerms: boolean
  isCertified: boolean
}

export interface AddQuestionPostType {
  userId: number
  deptId: number
  title: string
  content: string
}

export interface AddAnswerPostType {
  questionPostId: number
  userId: number
  likeNum: number  // default 0
  content: string
}

export interface AddLikeLogAnswerPostType {
  answerPostId: number
  userId: number
}

export interface AddBlockUserLogType {
  userId: number
  blockUserId: number
}