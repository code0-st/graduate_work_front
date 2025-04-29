import { Divider } from 'antd'
import { useChartDataContext } from 'app/providers'
import styled from 'styled-components'

import Metric from './Metric'

const StyledMetricWrapper = styled.div`
  padding: 6px;
`

const StyledNoData = styled.div`
  color: var(--color-text-4);
`

const StyledDivider = styled(Divider)`
  background-color: var(--color-text-4);
`

const Metrics = () => {
  const { metrics } = useChartDataContext()
  return (
    <StyledMetricWrapper>
      <StyledDivider />
      {metrics ? (
        Object.entries(metrics).map(([key, value]) => <Metric key={key} label={key} value={value} />)
      ) : (
        <StyledNoData>Метрики не сформированы</StyledNoData>
      )}
      <StyledDivider />
    </StyledMetricWrapper>
  )
}

export default Metrics
