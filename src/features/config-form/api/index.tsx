import axios from 'axios'

import { EPredictMethod } from '../lib/data'

type ConfigDTO = {
  name: string
  method: EPredictMethod

  window_size?: number
  alpha?: number
  seasonal_periods?: number
  steps?: number
}
type ResponseDTO = {
  status: 'OK'
  close_values: Array<number>
  dates_values: Array<number>
}
export const getPrediction = async (config: ConfigDTO) => {
  const BASE = 'http://localhost:8080'
  try {
    return await axios.post<ResponseDTO>(`${BASE}/train`, config)
  } catch (e) {
    console.log(e)
  }
}
