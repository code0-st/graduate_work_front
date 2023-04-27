import { createContext, useCallback, useContext, useState } from 'react'

type TChartDataContext = {
  title: string
  seria: any[][]
  predictSeria: any[][]

  setDataFromUploadedFile: (title: string, data: any[][]) => void
  setDataFromPrediction: (data: any[][]) => void
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
  const [seria, setSeria] = useState<any[][]>([])
  const [predictSeria, setPredictSeria] = useState<any[][]>([])

  const setDataFromUploadedFile = useCallback((newTitle: string, newSeria: any[][]) => {
    setTitle(newTitle)
    setSeria(newSeria)
  }, [])

  const setDataFromPrediction = useCallback((newPredictSeria: any[][]) => {
    setPredictSeria(newPredictSeria)
  }, [])

  return (
    <ChartDataContext.Provider value={{ predictSeria, seria, setDataFromPrediction, setDataFromUploadedFile, title }}>
      {children}
    </ChartDataContext.Provider>
  )
}
