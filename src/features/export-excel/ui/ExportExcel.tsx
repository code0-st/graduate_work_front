import { Button } from 'antd'
import { formateDate } from 'app/helpers/date'
import { useChartDataContext } from 'app/providers'
import * as XLSX from 'xlsx'

type Props = {
  disabled?: boolean
  sheetName?: string
  fileName?: string
}

const ExportExcel = ({ disabled, fileName, sheetName }: Props) => {
  const { predictSeria, seria } = useChartDataContext()
  const additionalData = predictSeria[1].slice(predictSeria[0].length)
  const data = seria[0]
    .map((it: string, idx: number) => {
      const predictValueIndex = predictSeria[0].findIndex((pDate) => pDate === it)
      return {
        date: formateDate(it),
        predictValue: predictValueIndex !== -1 ? predictSeria[1][predictValueIndex] : undefined,
        value: +seria[1][idx],
      }
    })
    .concat(
      //@ts-ignore
      additionalData.map((it) => ({
        predictValue: it,
      })),
    )

  const handleOnExport = () => {
    const wb = XLSX.utils.book_new()
    const ws = XLSX.utils.json_to_sheet(data)
    XLSX.utils.book_append_sheet(wb, ws, sheetName || 'NewSheet')
    XLSX.writeFile(wb, fileName || 'NewExcel.xlsx')
  }
  return (
    <Button onClick={handleOnExport} disabled={disabled} type="primary" style={{ width: '100%' }}>
      Экспорт
    </Button>
  )
}

export default ExportExcel
