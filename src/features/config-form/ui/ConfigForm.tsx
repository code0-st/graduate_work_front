import { Divider, Form } from 'antd'
import { useChartDataContext } from 'app/providers'
import { useEffect, useRef, useState } from 'react'
import { ButtonElement, FormItem, InputElement, SelectElement } from 'shared/ui/kit'
import styled from 'styled-components'

import { getPrediction } from '../api'
import { EPredictMethod, FORM_INITIALS, PREDICT_METHODS } from '../lib/data'
import { parsePropsToNumber } from '../lib/utils'
import ArimaConfig from './arima-config/ArimaConfig'
import EmaConfig from './ema-config/EmaConfig'
import HoltWintersConfig from './holt-winters-config/HoltWintersConfig'
import NeuralNetworkConfig from './neural-network-config/NeuralNetworkConfig'
import SarimaConfig from './sarima-config/SarimaConfig'
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
  width: 100%;
  max-width: 80%;
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

  const controllerRef = useRef<AbortController | null>(null)

  useEffect(() => {
    const initialValues = FORM_INITIALS[method]
    form.setFieldsValue(initialValues)
  }, [method])

  useEffect(
    () => () => {
      controllerRef.current?.abort()
    },
    [],
  )

  const onCancel = () => {
    setCurrentStep(0)
    setFileName('')
    form.setFields([])
    controllerRef.current?.abort()
  }

  const onFieldsChange = (changed: any[]) => {
    form?.setFields(changed.map((field) => ({ ...field, errors: [] })))
  }

  const onFormFinish = async () => {
    controllerRef.current = new AbortController()
    const formValues = parsePropsToNumber(form.getFieldsValue())
    setLoading(true)
    try {
      const response = await getPrediction(
        {
          filename: fileName,
          method,
          params: formValues,
        },
        controllerRef.current?.signal,
      )
      setPrediction(response?.data)
      setCurrentStep(2)
    } catch (e) {
      console.log(e)
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
          <FormItem name={'forecast_steps'} label={'Количество шагов прогнозирования'}>
            <InputElement
              placeholder={'Введите количество шагов прогнозирования'}
              disabled={isLoading}
              type="number"
              min={0}
              max={15}
            />
          </FormItem>

          <FormItem name={'test_ratio'} label={'Процент под тестовую выборку'}>
            <InputElement
              placeholder={'Введите процент под тестовую выборку'}
              disabled={isLoading}
              type="number"
              min={0}
              max={0.5}
              step={0.01}
            />
          </FormItem>

          {(method === EPredictMethod.SMA || method === EPredictMethod.LinearRegression) && (
            <SmaConfig isLoading={isLoading} />
          )}
          {method === EPredictMethod.EMA && <EmaConfig isLoading={isLoading} />}
          {method === EPredictMethod.HoltWinters && <HoltWintersConfig isLoading={isLoading} />}
          {method === EPredictMethod.NeuralNetwork && <NeuralNetworkConfig isLoading={isLoading} />}
          {method === EPredictMethod.ARIMA && <ArimaConfig isLoading={isLoading} />}
          {method === EPredictMethod.SARIMA && <SarimaConfig isLoading={isLoading} />}
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
