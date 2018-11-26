import { compose, withProps } from 'recompose'

import { Cols, Props } from '..'

export default compose<Props, Props>(withProps({ flex: 6 }))(Cols)
