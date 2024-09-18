import { DefaultOptionType } from 'antd/es/select'

/** @description Методы прогнозирования временных рядов */
export enum EPredictMethod {
  /** @description Метод скользящего среднего */
  SMA = 'SMA',
  /** @description Экспоненциальное сглаживание */
  EMA = 'EMA',
  /** @description Метод Хольта-Винтерса */
  HoltWinters = 'HoltWinters',
  /** @description Линейная регрессия */
  LinearRegression = 'LinearRegression',
  /** @description Нейронные сети */
  NeuralNetwork = 'NeuralNetwork',
  /** @description Авторегрессионное интегрированное скользящее среднее */
  ARIMA = 'ARIMA',
}

export const PREDICT_METHODS: Array<DefaultOptionType> = [
  { value: EPredictMethod.SMA, label: 'Метод скользящего среднего' },
  { value: EPredictMethod.EMA, label: 'Экспоненциальное сглаживание' },
  { value: EPredictMethod.HoltWinters, label: 'Метод Хольта-Винтерса' },
  { value: EPredictMethod.LinearRegression, label: 'Линейная регрессия' },
  { value: EPredictMethod.NeuralNetwork, label: 'Нейронные сети' },
  { value: EPredictMethod.ARIMA, label: 'Авторегрессионное интегрированное скользящее среднее' },
]
