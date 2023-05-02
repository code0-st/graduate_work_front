import { Steps } from 'antd'
import styled from 'styled-components'

export type Step = {
  title: string
  description: string
}

type Props = {
  items: Step[]
  currentStep: number
  onChange: (step: number) => void
}

const StyledSteps = styled(Steps)`
  margin: 20px auto;
  max-width: 600px !important;
`

const Stepper: React.FC<Props> = ({ currentStep, items, onChange }) => (
  <StyledSteps direction="horizontal" current={currentStep} items={items} onChange={onChange} />
)

export default Stepper
