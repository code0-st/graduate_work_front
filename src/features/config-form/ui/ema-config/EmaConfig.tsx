import { memo } from 'react'
import { FormItem, InputElement } from 'shared/ui/kit'

type Props = {
  isLoading: boolean
}

const EmaConfig: React.FC<Props> = memo(({ isLoading }) => (
  <>
    <FormItem name={'alpha'} label={'Коэффициент сглаживания (0 < alpha < 1)'}>
      <InputElement
        placeholder={'Введите коэффициент сглаживания'}
        disabled={isLoading}
        type="number"
        min={0}
        max={1}
        defaultValue={0.5}
      />
    </FormItem>
  </>
))

export default EmaConfig
