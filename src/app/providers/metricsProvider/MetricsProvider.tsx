import { createContext, useContext, useState } from 'react'

export type Metrics = {
  MAD: number
  MAPE: number
  MPE: number
  MSE: number
  'Стандартная ошибка': number
}

type TMetricsContext = {
  metrics?: Metrics
  setMetrics: (value?: Metrics) => void
}
const MetricsContext = createContext<TMetricsContext>({
  setMetrics: () => {},
})

export const useMetricsContext = () => useContext(MetricsContext)

type Props = {
  children?: React.ReactNode
}
export const MetricsProvider: React.FC<Props> = ({ children }) => {
  const [metrics, setMetrics] = useState<Metrics | undefined>()
  const onSetMetrics = (value?: Metrics) => setMetrics(value)
  return <MetricsContext.Provider value={{ metrics, setMetrics: onSetMetrics }}>{children}</MetricsContext.Provider>
}
