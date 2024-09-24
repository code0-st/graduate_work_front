import { formateDate } from 'app/helpers/date'
import { useChartDataContext } from 'app/providers'
import { Brush, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const Chart: React.FC = () => {
  const { seria } = useChartDataContext()
  console.log('__TEST__ seria', seria)

  // const additionalData = predictSeria[1].slice(predictSeria[0].length)
  const data = seria[0].map((it: string, idx: number) =>
    // const predictValueIndex = predictSeria[0].findIndex((pDate) => pDate === it)
    ({
      date: formateDate(it),
      // predictValue: predictValueIndex !== -1 ? predictSeria[1][predictValueIndex] : undefined,
      predictValue: undefined,
      value: +seria[1][idx],
    }),
  )
  console.log('__TEST__ data', data)
  // .concat(
  //   //@ts-ignore
  //   additionalData.map((it) => ({
  //     predictValue: it,
  //   })),
  // )

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
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} isAnimationActive={false} />
        <Line type="monotone" dataKey="predictValue" stroke="#d44710" activeDot={{ r: 8 }} isAnimationActive={false} />
        <Brush dataKey="date" height={30} stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default Chart
