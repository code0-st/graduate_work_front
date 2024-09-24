import { memo } from 'react'
import { FormItem, InputElement } from 'shared/ui/kit'

type Props = {
  isLoading: boolean
}

const LinearRegressionConfig: React.FC<Props> = memo(({ isLoading }) => (
  <>
    <FormItem name={'window_size'} label={'Размер окна для создания признаков'}>
      <InputElement
        placeholder={'Введите размер окна для создания признаков'}
        disabled={isLoading}
        type="number"
        min={0}
        defaultValue={15}
      />
    </FormItem>
    <FormItem name={'steps'} label={'Количество шагов, на которые нужно сделать прогноз'}>
      <InputElement
        placeholder={'Введите количество шагов'}
        disabled={isLoading}
        type="number"
        min={0}
        defaultValue={5}
      />
    </FormItem>
  </>
))

export default LinearRegressionConfig
