import { InboxOutlined } from '@ant-design/icons'
import { message, Upload } from 'antd'
import { RcFile, UploadChangeParam, UploadFile } from 'antd/es/upload'
import { formatStrArrayToArray } from 'app/helpers/json'
import { useChartDataContext } from 'app/providers'
import { CsvParser } from 'features/csv-parser'
import React, { useCallback } from 'react'

const { Dragger } = Upload

const FileLoader: React.FC = () => {
  const { setDataFromPrediction, setDataFromUploadedFile } = useChartDataContext()

  const onChange = useCallback(
    (info: UploadChangeParam<UploadFile<any>>) => {
      const { response, status } = info.file
      if (status === 'done') {
        message.success(`${info.file.name} успешно загружен.`)
        const fDates = formatStrArrayToArray(response.dates)
        const fValues = formatStrArrayToArray(response.values)
        setDataFromPrediction([fDates, fValues])
      }
    },
    [setDataFromPrediction],
  )

  const beforeUploadHandle = useCallback(
    (file: RcFile) => {
      const reader = new FileReader()
      reader.onload = async ({ target }) => {
        if (target) {
          const csvParser = new CsvParser(file.name, target.result as string)
          const filteredColumns = csvParser.valuesWithFilter(['<DATE>', '<CLOSE>'])
          setDataFromUploadedFile(csvParser.name, filteredColumns)
        }
      }
      reader.readAsText(file)
    },
    [setDataFromUploadedFile],
  )

  return (
    <Dragger
      accept=".csv"
      action="http://localhost:8080/files"
      name="data"
      onChange={onChange}
      beforeUpload={beforeUploadHandle}
      showUploadList={false}
      multiple={false}
    >
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">Click or drag file to this area to upload</p>
      <p className="ant-upload-hint">
        Support for a single or bulk upload. Strictly prohibited from uploading company data or other banned files.
      </p>
    </Dragger>
  )
}

export default FileLoader
