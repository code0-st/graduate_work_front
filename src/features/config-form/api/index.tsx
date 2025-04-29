import axios from 'axios'

import { EPredictMethod } from '../lib/data'

/** Конфигурация запроса прогнозирования */
type ConfigDTO = {
  /** @description Имя файла */
  filename: string
  /** @description Метод прогнозирования */
  method: EPredictMethod
  /** @description Параметры конфигурации конкретного метода */
  params:
    | SmaMethodParams
    | EmaMethodParams
    | HoltWintersMethodParams
    | ArimaMethodParams
    | SarimaMethodParams
    | NeuralNetworkMethodParams
}

/** Общие параметры всех методов прогнозирования */
export type CommonMethodParams = {
  /**
   * @description Кол-во шагов прогнозирования
   * @example 10
   * @default 10
   */
  forecast_steps?: number

  /**
   * @description Процент под тестовую выборку
   * @example [0; 1]
   * @default 0.25
   */
  test_ratio?: number
}

/** Параметры для SMA и LinearRegression */
export type SmaMethodParams = CommonMethodParams & {
  /**
   * @description Размер скользящего окна
   * @example 10
   * @default 10
   */
  window_size?: number
}

/** Параметры для EMA */
export type EmaMethodParams = CommonMethodParams & {
  /**
   * @description Коэффициент сглаживания
   * @example [0, 1]
   * @default 0.5
   */
  alpha?: number
}

/** Параметры для метода Хольта-Винтерса */
export type HoltWintersMethodParams = CommonMethodParams & {
  /**
   * @description Тип сезонности
   * @example 'add': аддитиваня сезонность
   * @example 'mul': мультипликативная сезонность
   * @default 'add'
   */
  seasonal?: 'add' | 'mul'

  /**
   * @description Период сезонности
   * @default 50
   */
  seasonal_periods?: number
}

// p — порядок авторегрессии, который описывает количество предыдущих наблюдений, принимаемых во внимание в модели.
// d — порядок интегрирования, который указывает, сколько раз нужно взять разность временного ряда для достижения стационарности.
// q — порядок скользящего среднего, который связан с количеством предыдущих ошибок, используемых в модели.

/** Параметры для метода ARIMA */
export type ArimaMethodParams = CommonMethodParams & {
  /**
   * @description Параметры p, d, q модели
   * @example 'p': порядок авторегрессии
   * @example 'd': порядок интегрирования
   * @example 'q': порядок скользящего среднего
   * @default [1, 1, 1]
   */
  order?: [number, number, number]

  /**
   * @description Не учитывать order, автопоиск оптимальных параметров
   * @default false
   */
  use_auto_arima?: boolean
}

// P — порядок сезонной авторегрессии, и он основан на количестве предыдущих сезонов, которые влияют на текущий сезон.
// D — порядок сезонной интеграции, то есть сколько раз нужно продифференцировать данные, чтобы убрать сезонные тренды.
// Q — порядок сезонного скользящего среднего, то есть как много предыдущих сезонных ошибок прогноза используется в модели.
// m — это длина сезонного периода. Например, если данные имеют годовую сезонность и данные собираются ежемесячно, то m будет равно 12.

/** Параметры для метода SARIMA */
export type SarimaMethodParams = CommonMethodParams & {
  /**
   * @description Несезонные параметры p, d, q модели
   * @example 'p': порядок авторегрессии
   * @example 'd': порядок интегрирования
   * @example 'q': порядок скользящего среднего
   * @default [1, 1, 1]
   */
  order?: [number, number, number]

  /**
   * @description Сезонные параметры P, D, Q, m модели
   * @example 'P': порядок сезонной авторегрессии
   * @example 'D': порядок сезонной интеграции
   * @example 'Q': порядок сезонного скользящего среднего
   * @example 'm': длина сезонного периода
   * @default [1, 1, 1, 12]
   */
  seasonal_order?: [number, number, number, number]

  /**
   * @description Не учитывать order, автопоиск оптимальных параметров
   * @default false
   */
  use_auto_arima?: boolean
}

/** Параметры для метода Нейронная сеть */
export type NeuralNetworkMethodParams = CommonMethodParams & {
  /**
   * @description Размер окна выборки
   * @default 20
   */
  window_size?: number

  /**
   * @description Кол-во эпох обучения
   * @default 20
   */
  epochs?: number

  /**
   * @description Размер батча
   * @default 8
   */
  batch_size?: number
}

export type ResponseDTO = {
  train: Array<number>
  test_true: Array<number>
  test_predicted: Array<number>
  forecast: Array<number>
  metrics: Metrics
}

export type Metrics = {
  mse: number
  mae: number
  mape: number
  r2: number
}

export const getPrediction = async (config: ConfigDTO, signal?: AbortSignal) => {
  const BASE = 'http://localhost:8080'
  try {
    return await axios.post<ResponseDTO>(`${BASE}/predict`, config, { signal })
  } catch (e) {
    throw new Error()
  }
}
