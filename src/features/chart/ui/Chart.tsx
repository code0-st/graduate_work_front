import { useChartDataContext } from 'app/providers'

const Chart: React.FC = () => {
  const { seria, title } = useChartDataContext()
  console.log('__CHART__ seria', seria)

  return <div>{title}</div>
}

export default Chart
