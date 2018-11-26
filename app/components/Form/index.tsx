import dynamic from 'next/dynamic'
import { compose, defaultProps, setDisplayName } from 'recompose'

import BaseForm from './style'

const Form = compose<Props, Props>(
  defaultProps({
    is: 'form',
    action: 'javascript:;',
    method: 'post'
  }),
  setDisplayName('form')
)(BaseForm) as any

Form.Input = dynamic(import('./Input'))
Form.Checkbox = dynamic(import('./Checkbox'))
Form.Button = dynamic(import('./Button'))

type Props = {
  [key: string]: any
} & React.HTMLAttributes<HTMLFormElement>

export default Form
