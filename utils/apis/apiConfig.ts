import axios from 'axios'

const BASE_URL = 'http://ec2-3-34-229-56.ap-northeast-2.compute.amazonaws.com:8080/api/v1'

export const ec2 = axios.create({ baseURL: BASE_URL })