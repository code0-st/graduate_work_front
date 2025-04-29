import { memo } from 'react'
import { FormItem, InputElement } from 'shared/ui/kit'

type Props = {
  isLoading: boolean
}

const NeuralNetworkConfig: React.FC<Props> = memo(({ isLoading }) => (
  <>
    <FormItem name={'window_size'} label={'Размер окна'}>
      <InputElement placeholder={'Введите размер окна'} disabled={isLoading} type="number" min={2} />
    </FormItem>
    <FormItem name={'epochs'} label={'Количество эпох обучения'}>
      <InputElement placeholder={'Введите количество эпох обучения'} disabled={isLoading} type="number" />
    </FormItem>
    <FormItem name={'batch_size'} label={'Размер батча'}>
      <InputElement placeholder={'Введите размер батча'} disabled={isLoading} type="number" />
    </FormItem>
  </>
))

export default NeuralNetworkConfig
