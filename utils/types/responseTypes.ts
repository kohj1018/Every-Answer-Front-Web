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
  isDelete: boolean // 회원 탈퇴 여부
  agreeTerms: boolean // 약관 동의 여부
  isCertified: boolean  // 학교 인증 여부
  questionPostsList: number[] // 작성한 질문 글 ID 목록
  answerPostsList: number[] // 작성한 답변 글 ID 목록
  likeAnswerPostsList: number[] // 좋아요한 글 ID 목록
  blockUserIdList: number[] // 차단한 유저 ID 목록
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