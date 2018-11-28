import Box, { BoxProps, ReactBox } from '@/components/Box'
import dynamic from 'next/dynamic'
import { compose, defaultProps, setDisplayName } from 'recompose'

import BaseForm from './style'

const Form = compose<FormProps, FormProps>(
  defaultProps<FormProps>({
    is: 'form',
    action: 'javascript:;',
    method: 'post',
    display: 'inline-flex',
    alignItems: 'center'
  }),
  setDisplayName('form')
)(({ children, ...props }) => (
  <BaseForm
    display="flex"
    alignItems="center"
    margin={0}
    padding={0}
    border={0}
    {...props}>
    {children}
  </BaseForm>
)) as IForm & React.ComponentType<FormProps>

Form.Input = dynamic(import('./Input') as Promise<any>)
Form.Checkbox = dynamic(import('./Checkbox') as Promise<any>)
Form.Button = dynamic(import('./Button') as Promise<any>)

export interface FormProps extends BoxProps<HTMLFormElement> {
  groupFields?: boolean
}

export type InputProps = BoxProps<HTMLInputElement>
export type CheckboxProps = BoxProps<HTMLInputElement>
export type ButtonProps = BoxProps<HTMLButtonElement>

export interface IForm {
  Input?: ReactBox<{}, HTMLInputElement>
  Checkbox?: ReactBox<{}, HTMLInputElement>
  Button?: ReactBox<{}, HTMLButtonElement>
}

export default Form
