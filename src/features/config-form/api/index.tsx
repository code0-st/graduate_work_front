import axios from 'axios'

type ConfigDTO = {
  steps?: number
  epochs?: number
  count?: number
  name: string
}
export const getPrediction = async (config: ConfigDTO) => {
  const BASE = 'http://localhost:8080'
  try {
    return await axios.post(`${BASE}/train`, config)
  } catch (e) {
    console.log(e)
  }
}
