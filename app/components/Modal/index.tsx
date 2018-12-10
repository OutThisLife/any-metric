import withPortal, { PortalProps, PortalState } from '@/lib/withPortal'
import { Box } from 'rebass'
import { compose, defaultProps, setDisplayName, withHandlers } from 'recompose'

import Modal from './style'

export default compose<PortalState, PortalProps>(
  setDisplayName('modal'),
  defaultProps({
    id: 'modal'
  }),
  withPortal(),
  withHandlers(({ toggle }) => {
    const closeHandle = ({ keyCode }) => keyCode === 27 && toggle(false)

    return {
      onRef: () => ref => {
        if (!ref) {
          document.removeEventListener('keydown', closeHandle)
          return
        }

        document.addEventListener('keydown', closeHandle)
      }
    }
  })
)(({ onRef, id, toggle, children }) => (
  <Modal as="div" id={id} alignItems="center" justifyContent="center">
    <a
      ref={onRef}
      href="javascript:;"
      tabIndex={-1}
      onClick={() => toggle(false)}
    />
    <Box>{children}</Box>
  </Modal>
))
