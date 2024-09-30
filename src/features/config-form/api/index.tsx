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

type TempMetrics = {
  mse?: number
  mae?: number
}
type ResponseDTO = {
  status: 'OK'
  close_values: Array<number>
  dates_values: Array<number>
}

type TestResponse = {
  real_data: Array<number>
  predictions: Array<number>
  metrics: TempMetrics
}
export const getPrediction = async (config: ConfigDTO) => {
  const BASE = 'http://localhost:8080'
  try {
    return await axios.post<TestResponse>(`${BASE}/train`, config)
  } catch (e) {
    console.log(e)
  }
}
