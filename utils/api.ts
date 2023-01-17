import axios from 'axios'
import { AddQuestionPostType, AddUserType } from './types/addRequestTypes'
import { UpdateQuestionPostRequestType, UpdateUserRequestType } from './types/updateRequestTypes'

const BASE_URL = 'http://ec2-3-34-229-56.ap-northeast-2.compute.amazonaws.com:8080/api/v1'

const ec2 = axios.create({
  baseURL: BASE_URL
})

export const usersApi = {
  getUserById: async (userId: number) => await ec2.get(`/users/${userId}`),
  updateUser: async (userId: number, updateUserRequest: UpdateUserRequestType) => await ec2.put(`/users/${userId}`, {
    deptId: updateUserRequest.deptId,
    nickname: updateUserRequest.nickname,
    deptName: updateUserRequest.deptName,
    univ: updateUserRequest.univ,
    entranceYear: updateUserRequest.entranceYear,
    oauthId: updateUserRequest.oauthId,
    refreshToken: updateUserRequest.refreshToken,
    isDelete: updateUserRequest.isDelete
  }),
  addUser: async (addUserRequest: AddUserType) => await ec2.post('/users', {
    deptId: addUserRequest.deptId,
    nickname: addUserRequest.nickname,
    deptName: addUserRequest.deptName,
    univ: addUserRequest.univ,
    entranceYear: addUserRequest.entranceYear,
    oauthId: addUserRequest.oauthId,
    refreshToken: addUserRequest.refreshToken,
    isDelete: false
  })
}

export const questionPostsApi = {
  getQuestionPostById: async (questionPostId: number) => await ec2.get(`/questionPosts/${questionPostId}`),
  getInfiniteQuestionPosts: async (lastPostId: number, size: number) => await ec2.get(`/questionPosts?lastPostId=${lastPostId}&size=${size}`),
  updateQuestionPost: async (questionPostId: number, updateQuestionPostRequest: UpdateQuestionPostRequestType) => await ec2.put(`/questionPosts/${questionPostId}`, {
    deptId: updateQuestionPostRequest.deptId,
    title: updateQuestionPostRequest.title,
    content: updateQuestionPostRequest.content
  }),
  addQuestionPost: async (addQuestionPostRequest: AddQuestionPostType) => await ec2.post('/questionPosts', {
    userId: addQuestionPostRequest.userId,
    deptId: addQuestionPostRequest.deptId,
    title: addQuestionPostRequest.title,
    content: addQuestionPostRequest.content
  })
}