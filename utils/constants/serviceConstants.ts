export interface DeptClassMinimalType {
  deptId: number
  name: string
}
export const DEPT_CLASS_LIST: DeptClassMinimalType[] = [
  {
    "deptId": 1,
    "name": "컴퓨터공학과"
  },
  {
    "deptId": 2,
    "name": "전기전자공학과"
  },
  {
    "deptId": 3,
    "name": "기계공학과"
  },
  {
    "deptId": 99999,
    "name": "기타 전공 (추후 추가 예정)"
  }
]