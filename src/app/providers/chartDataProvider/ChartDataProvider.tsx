import { createContext, useCallback, useContext, useState } from 'react'

type TChartDataContext = {
  title: string
  seria: number[]
  predictSeria: number[]

  setDataFromUploadedFile: (title: string, data: number[]) => void
  setDataFromPrediction: (data: number[]) => void
}
const ChartDataContext = createContext<TChartDataContext>({
  predictSeria: [],
  seria: [],
  setDataFromPrediction: () => {},
  setDataFromUploadedFile: () => {},
  title: '',
})

export const useChartDataContext = () => useContext(ChartDataContext)

type Props = {
  children?: React.ReactNode
}
export const ChartDataProvider: React.FC<Props> = ({ children }) => {
  const [title, setTitle] = useState<string>('')
  const [seria, setSeria] = useState<number[]>([])
  const [predictSeria, setPredictSeria] = useState<number[]>([])

  const setDataFromUploadedFile = useCallback((newTitle: string, newSeria: number[]) => {
    setTitle(newTitle)
    setSeria(newSeria)
  }, [])

  const setDataFromPrediction = useCallback((newPredictSeria: number[]) => {
    setPredictSeria(newPredictSeria)
  }, [])

  return (
    <ChartDataContext.Provider value={{ predictSeria, seria, setDataFromPrediction, setDataFromUploadedFile, title }}>
      {children}
    </ChartDataContext.Provider>
  )
}
