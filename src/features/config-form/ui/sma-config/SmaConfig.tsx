import { memo } from 'react'
import { FormItem, InputElement } from 'shared/ui/kit'

type Props = {
  isLoading: boolean
}

const SmaConfig: React.FC<Props> = memo(({ isLoading }) => (
  <>
    <FormItem name={'window_size'} label={'Размер окна для вычисления скользящего среднего'}>
      <InputElement
        placeholder={'Введите размер окна для вычисления скользящего среднего'}
        disabled={isLoading}
        type="number"
        min={2}
        defaultValue={6}
      />
    </FormItem>
  </>
))

export default SmaConfig
