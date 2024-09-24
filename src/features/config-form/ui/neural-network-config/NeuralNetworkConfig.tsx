import { memo } from 'react'
import { FormItem, InputElement } from 'shared/ui/kit'

type Props = {
  isLoading: boolean
}

const NeuralNetworkConfig: React.FC<Props> = memo(({ isLoading }) => (
  <>
    {/* TODO: Подставить правильный label */}
    <FormItem name={'window_size'} label={'Размер окна'}>
      <InputElement placeholder={'Введите размер окна'} disabled={isLoading} type="number" min={2} defaultValue={9} />
    </FormItem>
  </>
))

export default NeuralNetworkConfig
