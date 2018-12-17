import withPortal, {
  Direction,
  PortalProps,
  PortalState
} from '@/lib/withPortal'
import { Box } from 'rebass'
import { compose, defaultProps, setDisplayName } from 'recompose'

import Popover from './style'

export default compose<PopoverProps & PortalState, PopoverProps & PortalProps>(
  setDisplayName('popover'),
  defaultProps({
    id: 'popover',
    direction: 'bottom'
  }),
  withPortal()
)(({ children, id, direction }) => (
  <Popover as="div" id={id} direction={direction}>
    <Box>{children}</Box>
  </Popover>
))

export interface PopoverProps {
  id: string
  direction?: Direction
}
