import withPortal, { PortalProps, PortalState } from '@/lib/withPortal'
import { Box } from 'rebass'
import { compose, defaultProps, setDisplayName } from 'recompose'

import Modal from './style'

export default compose<PortalState, PortalProps>(
  setDisplayName('modal'),
  defaultProps({
    id: 'modal'
  }),
  withPortal()
)(({ id, toggle, children }) => (
  <Modal as="div" id={id} alignItems="center" justifyContent="center">
    <a href="javascript:;" tabIndex={-1} onClick={() => toggle(false)} />
    <Box>{children}</Box>
  </Modal>
))
