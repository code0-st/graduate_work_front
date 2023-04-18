import { InboxOutlined } from '@ant-design/icons'
import { Upload } from 'antd'
import React from 'react'

const { Dragger } = Upload

const FileLoader: React.FC = () => {
  ;<Dragger>
    <p className="ant-upload-drag-icon">
      <InboxOutlined />
    </p>
    <p className="ant-upload-text">Click or drag file to this area to upload</p>
    <p className="ant-upload-hint">
      Support for a single or bulk upload. Strictly prohibited from uploading company data or other banned files.
    </p>
  </Dragger>
  return null
}

export default FileLoader
