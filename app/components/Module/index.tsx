import { Box, BoxProps } from 'rebass'
import { compose, setDisplayName } from 'recompose'

import Module from './style'

export default compose<ModuleProps, ModuleProps>(setDisplayName('module'))(
  ({ children, ...props }) => (
    <Module {...props}>
      <Box>{children}</Box>
    </Module>
  )
)

export interface ModuleProps extends BoxProps {
  as?: any
}
