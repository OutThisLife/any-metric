import { compose, defaultProps, setDisplayName } from 'recompose'

import Button from './style'

export default compose<Props, Props>(
  defaultProps({ type: 'submit' }),
  setDisplayName('button')
)(Button)

type Props = { [key: string]: any } & React.HTMLAttributes<HTMLButtonElement>
