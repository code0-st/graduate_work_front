import { DefaultOptionType } from 'antd/es/select'

import {
  ArimaMethodParams,
  CommonMethodParams,
  EmaMethodParams,
  HoltWintersMethodParams,
  NeuralNetworkMethodParams,
  SarimaMethodParams,
  SmaMethodParams,
} from '../api'

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
  /** @description Сезонное авторегрессионное интегрированное скользящее среднее */
  SARIMA = 'SARIMA',
}

export const PREDICT_METHODS: Array<DefaultOptionType> = [
  { label: 'Метод скользящего среднего', value: EPredictMethod.SMA },
  { label: 'Экспоненциальное сглаживание', value: EPredictMethod.EMA },
  { label: 'Метод Хольта-Винтерса', value: EPredictMethod.HoltWinters },
  { label: 'Линейная регрессия', value: EPredictMethod.LinearRegression },
  { label: 'Нейронные сети', value: EPredictMethod.NeuralNetwork },
  { label: 'Авторегрессионное интегрированное скользящее среднее', value: EPredictMethod.ARIMA },
  { label: 'Сезонное авторегрессионное интегрированное скользящее среднее', value: EPredictMethod.SARIMA },
]

const commonParams: CommonMethodParams = { forecast_steps: 10, test_ratio: 0.25 }

export const FORM_INITIALS: Record<
  EPredictMethod,
  | SmaMethodParams
  | EmaMethodParams
  | HoltWintersMethodParams
  | ArimaMethodParams
  | SarimaMethodParams
  | NeuralNetworkMethodParams
> = {
  [EPredictMethod.SMA]: { ...commonParams, window_size: 10 },
  [EPredictMethod.EMA]: { ...commonParams, alpha: 0.5 },
  [EPredictMethod.HoltWinters]: { ...commonParams, seasonal: 'add', seasonal_periods: 50 },
  [EPredictMethod.LinearRegression]: { ...commonParams, window_size: 10 },
  [EPredictMethod.NeuralNetwork]: { ...commonParams, batch_size: 8, epochs: 20, window_size: 20 },
  [EPredictMethod.ARIMA]: { ...commonParams, order: [1, 1, 1], use_auto_arima: false },
  [EPredictMethod.SARIMA]: { ...commonParams, order: [1, 1, 1], seasonal_order: [1, 1, 1, 12], use_auto_arima: false },
}

export const ARIMA_FORM_ITEMS = [
  {
    label: 'Порядок авторегрессии',
    placeholder: 'Введите порядок авторегрессии',
    title:
      'Порядок авторегрессии, который описывает количество предыдущих наблюдений, принимаемых во внимание в модели.',
  },
  {
    label: 'Порядок интегрирования',
    placeholder: 'Введите порядок интегрирования',
    title:
      'Порядок интегрирования, который указывает, сколько раз нужно взять разность временного ряда для достижения стационарности.',
  },
  {
    label: 'Порядок скользящего среднего',
    placeholder: 'Введите порядок скользящего среднего',
    title: 'Порядок скользящего среднего, который связан с количеством предыдущих ошибок, используемых в модели.',
  },
]

export const SARIMA_FORM_ITEMS = [
  {
    label: 'Порядок сезонной авторегрессии',
    placeholder: 'Введите порядок сезонной авторегрессии',
    title:
      'Порядок сезонной авторегрессии, и он основан на количестве предыдущих сезонов, которые влияют на текущий сезон.',
  },
  {
    label: 'Порядок сезонной интеграции',
    placeholder: 'Введите порядок сезонного скользящего среднего',
    title:
      'Порядок сезонной интеграции, то есть сколько раз нужно продифференцировать данные, чтобы убрать сезонные тренды.',
  },
  {
    label: 'Порядок сезонного скользящего среднего',
    placeholder: 'Введите порядок скользящего среднего',
    title:
      'Порядок сезонного скользящего среднего, то есть как много предыдущих сезонных ошибок прогноза используется в модели.',
  },
  {
    label: 'Длина сезонного периода',
    placeholder: 'Введите длину сезонного периода',
    title:
      'Это длина сезонного периода. Например, если данные имеют годовую сезонность и данные собираются ежемесячно, то m будет равно 12.',
  },
]
