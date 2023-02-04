import dayjs from 'dayjs'

const Airtable = require('airtable')
const base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base('appyWmsRoVqpEokRH')

export type CsType = '문의' | '건의' | '신고'
export type ReportType = '유저' | '질문글' | '답변글' | 'NotReport'
export const postCSContent = (csType: CsType, userId: number, nickname: string = 'nickname', content: string, reportType: ReportType = 'NotReport', reportedId: number = 0) => base('customer-service').create([
  {
    "fields": {
      "csType": csType,
      "userId": parseInt(userId.toString()),
      "nickname": nickname,
      "content": content,
      "createdAt": dayjs().format('YY-MM-DD HH:mm:ss'),
      "reportedId": parseInt(reportedId.toString()),
      "reportType": reportType
    }
  }
])