import { Layout } from 'antd'
import { useChartDataContext } from 'app/providers'
import { Chart } from 'features/chart'
import { ConfigForm } from 'features/config-form'
import { Stepper } from 'features/stepper'
import { data } from 'features/stepper/lib/data'
import { useState } from 'react'
import styled from 'styled-components'

const { Content, Footer, Header } = Layout

const Title = styled.div`
  text-align: center;
  font-size: 18px;
  color: var(--color-white);
`

const StyledHeader = styled(Header)`
  background-color: var(--color-bg-3);
`
const StyledLayout = styled(Layout)`
  width: 100%;
  height: 100%;
`
const StyledFooter = styled(Footer)`
  text-align: center;
  background-color: var(--color-bg-4);
`

const MainPage = () => {
  const { predictSeria, title } = useChartDataContext()
  const [currentStep, setCurrentStep] = useState<number>(0)
  const [fileName, setFileName] = useState<string>('')

  return (
    <StyledLayout>
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
    </StyledLayout>
  )
}

export default MainPage
