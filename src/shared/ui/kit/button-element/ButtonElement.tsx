import Button, { ButtonProps } from 'antd/es/button/button'
import { FC, RefAttributes } from 'react'

export type ButtonElementProps = ButtonProps & RefAttributes<HTMLElement>
const ButtonElement: FC<ButtonElementProps> = (props) => <Button {...props} />

export default ButtonElement
