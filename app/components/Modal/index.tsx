import withPortal, { PortalProps, PortalState } from '@/lib/withPortal'
import { Box } from 'rebass'
import { compose, setDisplayName, withProps } from 'recompose'

import Modal from './style'

export default compose<PortalState, PortalProps>(
  setDisplayName('modal'),
  withProps(() => ({ id: 'popover' })),
  withPortal()
)(({ toggle, children }) => (
  <Modal as="div" id="modal" alignItems="center" justifyContent="center">
    <a href="javascript:;" tabIndex={-1} onClick={() => toggle(false)} />
    <Box>{children}</Box>
  </Modal>
))
