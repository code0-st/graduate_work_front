import { InboxOutlined } from '@ant-design/icons'
import { message, Upload } from 'antd'
import { RcFile, UploadChangeParam, UploadFile } from 'antd/es/upload'
import { useChartDataContext } from 'app/providers'
import { CsvParser } from 'features/csv-parser'
import React, { useCallback } from 'react'

const { Dragger } = Upload

const FileLoader: React.FC = () => {
  const { setDataFromPrediction, setDataFromUploadedFile } = useChartDataContext()

  const onChange = useCallback((info: UploadChangeParam<UploadFile<any>>) => {
    const { response, status } = info.file
    if (status === 'done') {
      message.success(`${info.file.name} успешно загружен.`)
      const formattedData = response.data
        .slice(1, -1)
        .split(', ')
        .map((it: string) => +it)
      setDataFromPrediction(formattedData)
    }
  }, [])

  const beforeUploadHandle = useCallback((file: RcFile) => {
    const reader = new FileReader()
    reader.onload = async ({ target }) => {
      if (target) {
        const csvParser = new CsvParser(file.name, target.result as string)
        setDataFromUploadedFile(
          csvParser.name,
          csvParser.valuesWithFilter(['<CLOSE>']).map((it) => +it),
        )
      }
    }
    reader.readAsText(file)
  }, [])

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
