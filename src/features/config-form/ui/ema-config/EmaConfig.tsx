import { memo } from 'react'
import { FormItem, InputElement } from 'shared/ui/kit'

type Props = {
  isLoading: boolean
}

const EmaConfig: React.FC<Props> = memo(({ isLoading }) => (
  <>
    <FormItem name={'alpha'} label={'Коэффициент сглаживания'}>
      <InputElement
        placeholder="Введите коэффициент сглаживания"
        title="Коэффициент сглаживания (0 < alpha < 1)"
        disabled={isLoading}
        type="number"
        min={0}
        max={1}
        step={0.1}
      />
    </FormItem>
  </>
))

export default EmaConfig
