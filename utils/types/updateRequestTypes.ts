export interface UpdateUserRequestType {
  deptId: number,
  nickname: string,
  deptName: string,
  univ: string,
  entranceYear: number,
  oauthId: string,
  refreshToken: string,
  isDelete: boolean
}

export interface UpdateQuestionPostRequestType {
  deptId: number,
  title: string,
  content: string
}

export interface UpdateAnswerPostRequestType {
  content: string
}