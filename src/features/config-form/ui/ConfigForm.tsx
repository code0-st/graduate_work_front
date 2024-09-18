import { Divider, Form, message } from 'antd'
import { formatStrArrayToArray } from 'app/helpers/json'
import { useChartDataContext, useMetricsContext } from 'app/providers'
import { useState } from 'react'
import { ButtonElement, FormItem, SelectElement } from 'shared/ui/kit'
import styled from 'styled-components'

import { getPrediction } from '../api'
import { EPredictMethod, PREDICT_METHODS } from '../lib/data'
import NeuralNetworkConfig from './neural-network-config/NeuralNetworkConfig'

const { useForm } = Form

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
  setCurrentStep: (step: number) => void
  fileName?: string
  setFileName: (name: string) => void
}

const ConfigForm: React.FC<Props> = ({ fileName, setCurrentStep, setFileName }) => {
  const [form] = useForm()
  const { setDataFromPrediction } = useChartDataContext()
  const { setMetrics } = useMetricsContext()

  const [isLoading, setLoading] = useState<boolean>(false)
  const [predictMethod, setPredictMethod] = useState<EPredictMethod>(EPredictMethod.NeuralNetwork)

  const onCancel = () => {
    setCurrentStep(0)
    setFileName('')
    form.setFields([])
  }

  const onFieldsChange = (changed: any[]) => {
    form?.setFields(changed.map((field) => ({ ...field, errors: [] })))
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

  return (
    <Outer>
      <FormItem
        name={'method'}
        label={'Выбор метода для прогнозирования временного ряда'}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
      >
        <SelectElement
          value={predictMethod}
          onChange={setPredictMethod}
          options={PREDICT_METHODS}
          placeholder={'Выберите метод'}
        />
      </FormItem>
      <Inner>
        <Form form={form} onFieldsChange={onFieldsChange}>
          {/* TODO: Конфигурации для различных методов при необходимости */}
          {predictMethod === EPredictMethod.SMA && <div>Метод скользящего среднего</div>}
          {predictMethod === EPredictMethod.EMA && <div>Экспоненциальное сглаживание</div>}
          {predictMethod === EPredictMethod.HoltWinters && <div>Метод Хольта-Винтерса</div>}
          {predictMethod === EPredictMethod.LinearRegression && <div>Линейная регрессия</div>}
          {predictMethod === EPredictMethod.NeuralNetwork && <NeuralNetworkConfig isLoading={isLoading} />}
          {predictMethod === EPredictMethod.ARIMA && <div>Авторегрессионное интегрированное скользящее среднее</div>}
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
  )
}

export default ConfigForm
