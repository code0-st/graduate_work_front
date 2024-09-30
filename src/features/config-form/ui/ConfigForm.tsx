import { Divider, Form, message } from 'antd'
import { useChartDataContext } from 'app/providers'
import { useState } from 'react'
import { ButtonElement, FormItem, SelectElement } from 'shared/ui/kit'
import styled from 'styled-components'

import { getPrediction } from '../api'
import { EPredictMethod, PREDICT_METHODS } from '../lib/data'
import { parsePropsToNumber } from '../lib/utils'
import EmaConfig from './ema-config/EmaConfig'
import HoltWintersConfig from './holt-winters-config/HoltWintersConfig'
import LinearRegressionConfig from './linear-regression-config/LinearRegressionConfig'
import NeuralNetworkConfig from './neural-network-config/NeuralNetworkConfig'
import SmaConfig from './sma-config/SmaConfig'

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
  fileName: string
  setFileName: (name: string) => void
}

const ConfigForm: React.FC<Props> = ({ fileName, setCurrentStep, setFileName }) => {
  const [form] = useForm()
  const { setPrediction } = useChartDataContext()

  const [isLoading, setLoading] = useState<boolean>(false)
  const [method, setMethod] = useState<EPredictMethod>(EPredictMethod.NeuralNetwork)

  const onCancel = () => {
    setCurrentStep(0)
    setFileName('')
    form.setFields([])
  }

  const onFieldsChange = (changed: any[]) => {
    form?.setFields(changed.map((field) => ({ ...field, errors: [] })))
  }

  const onFormFinish = async () => {
    const formValues = parsePropsToNumber(form.getFieldsValue())

    setLoading(true)
    try {
      const response = await getPrediction({
        method,
        name: fileName,
        ...formValues,
      })
      // @ts-ignore
      setPrediction(response?.data.real_data, response?.data.predictions)
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
        label={'Выбор метода для прогнозирования временного ряда'}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
      >
        <SelectElement value={method} onChange={setMethod} options={PREDICT_METHODS} placeholder={'Выберите метод'} />
      </FormItem>
      <Inner>
        <Form form={form} onFieldsChange={onFieldsChange}>
          {method === EPredictMethod.SMA && <SmaConfig isLoading={isLoading} />}
          {method === EPredictMethod.EMA && <EmaConfig isLoading={isLoading} />}
          {method === EPredictMethod.HoltWinters && <HoltWintersConfig isLoading={isLoading} />}
          {method === EPredictMethod.LinearRegression && <LinearRegressionConfig isLoading={isLoading} />}
          {method === EPredictMethod.NeuralNetwork && <NeuralNetworkConfig isLoading={isLoading} />}

          {/* TODO: Доделать на беке */}
          {method === EPredictMethod.ARIMA && <div>В РАЗРАБОТКЕ</div>}
        </Form>
      </Inner>
      <Divider />
      <Footer>
        <ButtonElement style={{ gridArea: 'left' }} onClick={onCancel}>
          Отменить
        </ButtonElement>
        <ButtonElement type="primary" onClick={onFormFinish} loading={isLoading}>
          Прогноз
        </ButtonElement>
      </Footer>
    </Outer>
  )
}

export default ConfigForm
