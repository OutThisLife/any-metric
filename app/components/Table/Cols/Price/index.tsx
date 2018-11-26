import { compose, withProps } from 'recompose'

import { Cols, Props } from '..'

export default compose<Props, Props>(
  withProps({
    flexGrow: 0,
    flexBasis: 80,
    paddingRight: 20,
    textAlign: 'right'
  })
)(Cols)
