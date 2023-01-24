import axios from 'axios'

const BASE_URL = 'https://everyanswer.xyz/api/v1'

export const ec2 = axios.create({ baseURL: BASE_URL })