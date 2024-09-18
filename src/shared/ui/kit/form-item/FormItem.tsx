import { Form, FormItemProps } from 'antd'
import styled from 'styled-components'

const { Item } = Form

const StyledItem = styled(Item)`
  .ant-form-item-required {
    &::before {
      content: '' !important;
      display: none !important;
    }
    &::after {
      width: 100%;
      content: '*' !important;
      display: inline-block !important;
      margin-left: 8px !important;
      color: var(--color-text-1) !important;
      font-size: 12px !important;
      font-family: SimSun, sans-serif !important;
      line-height: 1 !important;
    }
  }
  .ant-form-item-label > label {
    color: var(--color-text-1);
  }
`

type Props = FormItemProps

const FormItem: React.FC<Props> = ({ children, ...props }) => <StyledItem {...props}>{children}</StyledItem>

export default FormItem
