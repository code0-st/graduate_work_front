import { Layout } from 'antd'
import { useChartDataContext } from 'app/providers'
import { Chart } from 'features/chart'
import { ConfigForm } from 'features/config-form'
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
  height: 100vh !important;
  background-color: var(--color-bg-5) !important;
`

const MainPage = () => {
  const { predictSeria, title } = useChartDataContext()
  const [currentStep, setCurrentStep] = useState<number>(0)
  const [fileName, setFileName] = useState<string>('')

  return (
    <Outer>
      <Inner>
        <StyledHeader>
          <Title>{title || 'Загрузите .csv файл'}</Title>
        </StyledHeader>
        <Stepper items={data} currentStep={currentStep} onChange={setCurrentStep} />
        <Content>
          {currentStep < 2 && (
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
      </StyledSider>
    </Outer>
  )
}

export default MainPage
