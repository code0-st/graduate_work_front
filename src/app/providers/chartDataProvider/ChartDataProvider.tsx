import { Metrics, ResponseDTO } from 'features/config-form/api'
import { createContext, useContext, useState } from 'react'

type TChartDataContext = {
  title: string
  train: Array<number>
  testTrue: Array<number>
  testPredicted: Array<number>
  forecast: Array<number>
  metrics?: Metrics
  setPrediction: (value?: ResponseDTO) => void
  setTitle: (value: string) => void
}
const ChartDataContext = createContext<TChartDataContext>({
  forecast: [],
  setPrediction: (value?: ResponseDTO) => {},
  setTitle: (value) => {},
  testPredicted: [],
  testTrue: [],
  title: '',
  train: [],
})

export const useChartDataContext = () => useContext(ChartDataContext)

type Props = {
  children?: React.ReactNode
}
export const ChartDataProvider: React.FC<Props> = ({ children }) => {
  const [title, setTitle] = useState<string>('')

  const [train, setTrain] = useState<Array<number>>([])
  const [testTrue, setTestTrue] = useState<Array<number>>([])
  const [testPredicted, setTestPredicted] = useState<Array<number>>([])
  const [forecast, setForecast] = useState<Array<number>>([])
  const [metrics, setMetrics] = useState<Metrics | undefined>()

  const setPrediction = (predict?: ResponseDTO) => {
    if (!predict) return
    setTrain(predict.train)
    setTestTrue(predict.test_true)
    setTestPredicted(predict.test_predicted)
    setForecast(predict.forecast)
    setMetrics(predict.metrics)
  }

  const setTitleHandle = (value: string) => {
    setTitle(value)
  }

  return (
    <ChartDataContext.Provider
      value={{
        forecast,
        metrics,
        setPrediction,
        setTitle: setTitleHandle,
        testPredicted,
        testTrue,
        title,
        train,
      }}
    >
      {children}
    </ChartDataContext.Provider>
  )
}
