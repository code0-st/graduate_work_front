import { Metrics } from 'app/providers/metricsProvider/MetricsProvider'
import axios from 'axios'

type ConfigDTO = {
  steps?: number
  epochs?: number
  count?: number
  name: string
}
type ResponseDTO = {
  dates: string
  metrics: Metrics
  status: string
  values: string
}
export const getPrediction = async (config: ConfigDTO) => {
  const BASE = 'http://localhost:8080'
  try {
    return await axios.post<ResponseDTO>(`${BASE}/train`, config)
  } catch (e) {
    console.log(e)
  }
}
