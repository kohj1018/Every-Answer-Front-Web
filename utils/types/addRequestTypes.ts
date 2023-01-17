export interface AddUserType {
  deptId: number
  nickname: string
  deptName: string
  univ: string
  entranceYear: number
  oauthId: string
  refreshToken: string
}

export interface AddQuestionPostType {
  userId: number,
  deptId: number,
  title: string,
  content: string
}