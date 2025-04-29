import { Button } from 'antd'
import { useChartDataContext } from 'app/providers'
import { useEffect, useState } from 'react'
import * as XLSX from 'xlsx'

type Props = {
  disabled?: boolean
  sheetName?: string
  fileName?: string
}

const ExportExcel = ({ disabled, fileName, sheetName }: Props) => {
  const { forecast, testPredicted, testTrue, train } = useChartDataContext()

  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    if (!train.length || !testTrue.length || !testPredicted.length || !forecast.length) return

    setData([
      ...train.map((val, idx) => ({ train: val })),
      ...testTrue.map((val, idx) => ({ testPredicted: testPredicted[idx], testTrue: val })),
      ...forecast.map((val, idx) => ({ forecast: val })),
    ])
  }, [forecast])

  const handleOnExport = () => {
    const wb = XLSX.utils.book_new()
    const ws = XLSX.utils.json_to_sheet(data)
    XLSX.utils.book_append_sheet(wb, ws, sheetName || 'NewSheet')
    XLSX.writeFile(wb, fileName || 'NewExcel.xlsx')
  }
  return (
    <Button onClick={handleOnExport} disabled={disabled || !data.length} type="primary" style={{ width: '100%' }}>
      Экспорт
    </Button>
  )
}

export default ExportExcel
