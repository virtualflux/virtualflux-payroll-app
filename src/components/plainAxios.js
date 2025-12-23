import axios from 'axios'

export const plainAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
})
