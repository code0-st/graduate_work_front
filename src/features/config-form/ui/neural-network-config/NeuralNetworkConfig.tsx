import { memo } from 'react'
import { FormItem, InputElement } from 'shared/ui/kit'

type Props = {
  isLoading: boolean
}

const NeuralNetworkConfig: React.FC<Props> = memo(({ isLoading }) => (
  <>
    <FormItem name={'steps'} label={'Количество шагов'}>
      <InputElement
        placeholder={'Введите количество шагов выборки'}
        disabled={isLoading}
        type="number"
        min={2}
        defaultValue={9}
      />
    </FormItem>
    <FormItem name={'epochs'} label={'Количество эпох обучения'}>
      <InputElement
        placeholder={'Введите количество эпох обучения'}
        disabled={isLoading}
        type="number"
        min={1}
        defaultValue={200}
      />
    </FormItem>
    <FormItem name={'count'} label={'Количество прогнозируемых значений'}>
      <InputElement placeholder={'Введите количество прогнозируемых значений'} disabled={isLoading} min={1} />
    </FormItem>
  </>
))

export default NeuralNetworkConfig
