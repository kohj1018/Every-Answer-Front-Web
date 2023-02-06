import { DeptClassType } from '../types/responseTypes'
import { ec2 } from './apiConfig'

/** 모든 전공 분류 불러오기 */
export const getAllDeptClass = async (): Promise<DeptClassType[]> => {
  const res = await ec2.get<DeptClassType[]>('/deptClass/getAll')
  return res.data
}