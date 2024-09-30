import { createContext, useCallback, useContext, useState } from 'react'

type TChartDataContext = {
  title: string
  seria: any[][]
  predictSeria: any[][]

  setDataFromUploadedFile: (title: string, data: any[][]) => void
  setDataFromPrediction: (data: any[][]) => void

  newSeria: number[]
  newPrediction: number[]
  setPrediction: (a: number[], b: number[]) => void
}
const ChartDataContext = createContext<TChartDataContext>({
  predictSeria: [],
  seria: [],
  setDataFromPrediction: () => {},
  setDataFromUploadedFile: () => {},
  title: '',

  newSeria: [],
  newPrediction: [],
  setPrediction: () => {},
})

export const useChartDataContext = () => useContext(ChartDataContext)

type Props = {
  children?: React.ReactNode
}
export const ChartDataProvider: React.FC<Props> = ({ children }) => {
  const [title, setTitle] = useState<string>('')
  const [seria, setSeria] = useState<any[][]>([])
  const [predictSeria, setPredictSeria] = useState<any[][]>([])

  const [newSeria, setNewSeria] = useState<number[]>([])
  const [newPrediction, setNewPrediction] = useState<number[]>([])

  const setDataFromUploadedFile = useCallback((newTitle: string, newSeria: any[][]) => {
    setTitle(newTitle)
    setSeria(newSeria)
  }, [])

  const setDataFromPrediction = useCallback((newPredictSeria: (any | undefined)[][]) => {
    setPredictSeria(newPredictSeria)
  }, [])

  const setPrediction = useCallback((a: number[], b: number[]) => {
    setNewSeria(a)
    setNewPrediction(b)
  }, [])

  return (
    <ChartDataContext.Provider
      value={{
        predictSeria,
        seria,
        setDataFromPrediction,
        setDataFromUploadedFile,
        title,

        newSeria,
        newPrediction,
        setPrediction,
      }}
    >
      {children}
    </ChartDataContext.Provider>
  )
}
