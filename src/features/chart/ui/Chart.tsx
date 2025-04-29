import { useChartDataContext } from 'app/providers'
import { useEffect, useState } from 'react'
import { Brush, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, YAxis } from 'recharts'

const Chart: React.FC = () => {
  const { forecast, testPredicted, testTrue, train } = useChartDataContext()

  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    setData([
      ...train.map((val, idx) => ({ train: val })),
      ...testTrue.map((val, idx) => ({ testPredicted: testPredicted[idx], testTrue: val })),
      ...forecast.map((val, idx) => ({ forecast: val })),
    ])
  }, [forecast])

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{
          bottom: 10,
          left: 30,
          right: 30,
          top: 10,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          name="Обучающие данные"
          dataKey="train"
          stroke="blue"
          activeDot={{ r: 8 }}
          isAnimationActive={false}
        />
        <Line
          type="monotone"
          name="Тестовые (истинные)"
          dataKey="testTrue"
          stroke="green"
          activeDot={{ r: 8 }}
          isAnimationActive={false}
        />
        <Line
          type="monotone"
          name="Тестовые (предсказания)"
          dataKey="testPredicted"
          stroke="orange"
          activeDot={{ r: 8 }}
          isAnimationActive={false}
        />
        <Line
          type="monotone"
          name="Прогноз"
          dataKey="forecast"
          stroke="red"
          activeDot={{ r: 8 }}
          isAnimationActive={false}
        />
        <Brush dataKey="date" height={30} stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default Chart
