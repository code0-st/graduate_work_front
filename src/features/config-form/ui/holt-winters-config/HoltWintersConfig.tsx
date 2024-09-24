import { memo } from 'react'
import { FormItem, InputElement } from 'shared/ui/kit'

type Props = {
  isLoading: boolean
}

const HoltWintersConfig: React.FC<Props> = memo(({ isLoading }) => (
  <>
    {/* TODO: подставить правильный label */}
    <FormItem name={'seasonal_periods'} label={'Сезонность'}>
      <InputElement placeholder={'Введите сезонность'} disabled={isLoading} type="number" min={0} defaultValue={15} />
    </FormItem>
  </>
))

export default HoltWintersConfig
