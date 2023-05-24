import { Divider, Form, message, UploadFile } from 'antd'
import { formatStrArrayToArray } from 'app/helpers/json'
import { useChartDataContext, useMetricsContext } from 'app/providers'
import { FileLoader } from 'features/file-loader'
import { useState } from 'react'
import { ButtonElement, InputElement } from 'shared/ui/kit'
import styled from 'styled-components'

import { getPrediction } from '../api'

const { Item, useForm } = Form

const Outer = styled.div`
  padding: 32px;
  display: flex;
  flex-direction: column;
  max-width: 90%;
  margin: 0px auto;
  height: 100%;
`

const Inner = styled.div`
  max-width: 50%;
  margin: 0px auto;
`

const StyledItem = styled(Item)`
  .ant-form-item-required {
    &::before {
      content: '' !important;
      display: none !important;
    }
    &::after {
      width: 100%;
      content: '*' !important;
      display: inline-block !important;
      margin-left: 8px !important;
      color: var(--color-text-1) !important;
      font-size: 12px !important;
      font-family: SimSun, sans-serif !important;
      line-height: 1 !important;
    }
  }
  .ant-form-item-label > label {
    color: var(--color-text-1);
  }
`

const Footer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 0px auto;
  & > *:first-child {
    margin-right: 16px;
  }
`

type Props = {
  currentStep: number
  setCurrentStep: (step: number) => void
  fileName?: string
  setFileName: (name: string) => void
}

const ConfigForm: React.FC<Props> = ({ currentStep, fileName, setCurrentStep, setFileName }) => {
  const [form] = useForm()
  const { setDataFromPrediction } = useChartDataContext()
  const { setMetrics } = useMetricsContext()

  const [isLoading, setLoading] = useState(false)

  const onCancel = () => {
    setCurrentStep(0)
    setFileName('')
    form.setFields([])
  }

  const onFormFinish = async () => {
    const formValues = form.getFieldsValue()
    setLoading(true)
    try {
      const response = await getPrediction({
        count: formValues?.count || 0,
        epochs: formValues.epochs || 200,
        name: fileName || '',
        steps: formValues.steps || 9,
      })
      const fDates = formatStrArrayToArray(response?.data?.dates)
      const fValues = formatStrArrayToArray(response?.data?.values)
      const metrics = response?.data.metrics
      fDates && fValues && setDataFromPrediction([fDates, fValues])
      metrics && setMetrics(metrics)
      setCurrentStep(2)
    } catch (e) {
      message.info('Выберите файл!')
      setCurrentStep(0)
    } finally {
      setLoading(false)
    }
  }

  const onFileLoaded = (file: UploadFile<any>, nextStep?: number) => {
    setFileName(file.name)
    setCurrentStep(nextStep === undefined ? 1 : nextStep)
  }

  return currentStep === 1 ? (
    <Outer>
      <Inner>
        <Form
          form={form}
          onFieldsChange={(changed) => {
            form?.setFields(changed.map((field) => ({ ...field, errors: [] })))
          }}
        >
          <StyledItem name={'steps'} label={'Количество шагов'}>
            <InputElement
              placeholder={'Введите количество шагов выборки'}
              disabled={isLoading}
              type="number"
              min={2}
              defaultValue={9}
            />
          </StyledItem>
          <StyledItem name={'epochs'} label={'Количество эпох обучения'}>
            <InputElement
              placeholder={'Введите количество эпох обучения'}
              disabled={isLoading}
              type="number"
              min={1}
              defaultValue={200}
            />
          </StyledItem>
          <StyledItem name={'count'} label={'Количество прогнозируемых значений'}>
            <InputElement placeholder={'Введите количество прогнозируемых значений'} disabled={isLoading} min={1} />
          </StyledItem>
        </Form>
      </Inner>
      <Divider />
      <Footer>
        <ButtonElement style={{ gridArea: 'left' }} onClick={onCancel}>
          Отменить
        </ButtonElement>
        <ButtonElement type="primary" onClick={onFormFinish} loading={isLoading}>
          Обучить
        </ButtonElement>
      </Footer>
    </Outer>
  ) : (
    <FileLoader onFileLoaded={onFileLoaded} />
  )
}

export default ConfigForm
