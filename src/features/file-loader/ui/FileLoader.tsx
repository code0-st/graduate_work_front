import { InboxOutlined } from '@ant-design/icons'
import { message, Upload } from 'antd'
import { RcFile, UploadChangeParam, UploadFile } from 'antd/es/upload'
import { useChartDataContext } from 'app/providers'
import { CsvParser } from 'features/csv-parser'
import React, { useCallback } from 'react'

const { Dragger } = Upload

export type IFile = {
  uid: string | number
  lastModified: number
  lastModifiedDate: string
  name: string
  size: number
  type: string
  percent?: number
  originFileObj?: File
  status?: string
}

type Props = {
  onFileLoaded: (file: UploadFile<any>, nextStep?: number) => void
}

const FileLoader: React.FC<Props> = ({ onFileLoaded }) => {
  const { setDataFromUploadedFile } = useChartDataContext()

  const onChange = useCallback(
    (info: UploadChangeParam<UploadFile<any>>) => {
      const { status } = info.file
      if (status === 'done') {
        message.success(`${info.file.name} успешно загружен.`)
        onFileLoaded(info.file, 1)
      }
      if (status === 'error') {
        message.error(`${info.file.name} не был загружен.`)
        onFileLoaded(info.file, 0)
      }
    },
    [onFileLoaded],
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
      style={{ flex: 'auto' }}
    >
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">Нажмите или перетащите файл в эту область</p>
      <p className="ant-upload-hint">Загрузите файл в формате CSV</p>
    </Dragger>
  )
}

export default FileLoader
