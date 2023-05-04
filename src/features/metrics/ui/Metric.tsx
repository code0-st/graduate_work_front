import styled from 'styled-components'

const StyledLabel = styled.div`
  font-size: 15px;
  color: var(--color-text-4) !important;
  margin-right: 12px;
`
const StyledValue = styled.div`
  font-size: 14px;
  color: var(--color-text-5) !important;
  font-weight: 500;
`
const StyledRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
`

type Props = {
  label: string
  value: number
}
const Metric: React.FC<Props> = ({ label, value }) => (
  <StyledRow>
    <StyledLabel>{label}:</StyledLabel>
    <StyledValue>{value.toFixed(2)}</StyledValue>
  </StyledRow>
)

export default Metric
