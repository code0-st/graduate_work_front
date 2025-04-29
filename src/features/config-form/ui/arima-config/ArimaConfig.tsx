import { Form } from 'antd'
import { ARIMA_FORM_ITEMS } from 'features/config-form/lib/data'
import { memo } from 'react'
import { CheckboxElement, FormItem, InputElement } from 'shared/ui/kit'
import styled from 'styled-components'

const { List } = Form

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 24px;
`

type Props = {
  isLoading: boolean
}

const ArimaConfig: React.FC<Props> = memo(({ isLoading }) => (
  <>
    <Row>
      <List name={'order'}>
        {(fields) =>
          fields.map((field, index) => (
            <FormItem key={field.key} name={[index]} label={ARIMA_FORM_ITEMS[index].label}>
              <InputElement
                type="number"
                disabled={isLoading}
                min={0}
                placeholder={ARIMA_FORM_ITEMS[index].placeholder}
                title={ARIMA_FORM_ITEMS[index].title}
              />
            </FormItem>
          ))
        }
      </List>
    </Row>
    <FormItem name={'use_auto_arima'} label={'Использовать авто АРИМА'} valuePropName="checked">
      <CheckboxElement disabled={isLoading} />
    </FormItem>
  </>
))

export default ArimaConfig
