import { memo } from 'react'
import { FormItem, InputElement, SelectElement } from 'shared/ui/kit'

type Props = {
  isLoading: boolean
}

const SEASONAL_OPTIONS = [
  {
    value: 'add',
    label: 'Аддитиваня сезонность',
    title:
      'Аддитивная сезонность, когда сезонный эффект одинаков по амплитуде на всём протяжении ряда (например, +5 к значению каждый декабрь).',
  },
  {
    value: 'mul',
    label: 'Мультипликативная сезонность',
    title:
      'Мультипликативная сезонность, когда сезонный эффект зависит от уровня ряда (например, увеличение на 20% в декабре).',
  },
]

const HoltWintersConfig: React.FC<Props> = memo(({ isLoading }) => (
  <>
    <FormItem name={'seasonal'} label={'Тип сезонности'}>
      <SelectElement options={SEASONAL_OPTIONS} placeholder={'Выберите тип сезонности'} />
    </FormItem>

    <FormItem name={'seasonal_periods'} label={'Период сезонности'}>
      <InputElement placeholder={'Введите период сезонности'} disabled={isLoading} type="number" min={7} />
    </FormItem>
  </>
))

export default HoltWintersConfig
