import { Layout, UploadFile } from 'antd'
import { useChartDataContext } from 'app/providers'
import { Chart } from 'features/chart'
import { ConfigForm } from 'features/config-form'
import { ExportExcel } from 'features/export-excel'
import { FileLoader } from 'features/file-loader'
import { Metrics } from 'features/metrics'
import { data, Stepper } from 'features/stepper'
import { useState } from 'react'
import styled from 'styled-components'

const { Content, Footer, Header, Sider } = Layout

const Title = styled.div`
  text-align: center;
  font-size: 18px;
  color: var(--color-white);
`

const StyledHeader = styled(Header)`
  background-color: var(--color-bg-4);
`

const Outer = styled(Layout)`
  height: 100vh;
`

const Inner = styled(Layout)``

const StyledFooter = styled(Footer)`
  text-align: center;
  background-color: var(--color-bg-3);
`

const StyledSider = styled(Sider)`
  padding: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh !important;
  background-color: var(--color-bg-5) !important;
`

const MainPage = () => {
  const { predictSeria, seria, title } = useChartDataContext()
  const [currentStep, setCurrentStep] = useState<number>(0)
  const [fileName, setFileName] = useState<string>('')

  const onFileLoaded = (file: UploadFile<any>, nextStep?: number) => {
    setFileName(file.name)
    setCurrentStep(nextStep === undefined ? 1 : nextStep)
  }

  return (
    <Outer>
      <Inner>
        <StyledHeader>
          <Title>{title || 'Загрузите .csv файл'}</Title>
        </StyledHeader>
        <Stepper items={data} currentStep={currentStep} onChange={setCurrentStep} />
        <Content>
          {currentStep === 0 && <FileLoader onFileLoaded={onFileLoaded} />}

          {currentStep === 1 && (
            <ConfigForm
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
              fileName={fileName}
              setFileName={setFileName}
            />
          )}
          {currentStep == 2 && predictSeria.length && <Chart />}
        </Content>
        <StyledFooter>Chumarenko Kirill`s graduate work ©2023 Created by code0_st</StyledFooter>
      </Inner>
      <StyledSider>
        <Metrics />
        <ExportExcel disabled={!seria.length || !predictSeria.length || currentStep !== 2} />
      </StyledSider>
    </Outer>
  )
}

export default MainPage
