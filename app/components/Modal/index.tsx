import { createElement } from 'react'
import { createPortal } from 'react-dom'
import { Box, BoxProps } from 'rebass'
import {
  compose,
  onlyUpdateForKeys,
  setDisplayName,
  shouldUpdate,
  withState
} from 'recompose'

import Modal from './style'

export default compose<ModalProps, ModalProps>(
  setDisplayName('modal'),
  withState('isOpen', 'toggle', ({ isShown = false }) => isShown),
  shouldUpdate<ModalProps>(({ isOpen }, { toggle, isOpen: nextIsOpen }) => {
    if (!('browser' in process)) {
      return false
    }

    const $modal = document.getElementById('modal')

    if (isOpen && !nextIsOpen && !$modal.classList.contains('anim-out')) {
      $modal.classList.add('anim-out')

      $modal.children[1].addEventListener('animationend', () => toggle(false), {
        once: true
      })

      return false
    }

    return true
  }),
  onlyUpdateForKeys(['isOpen'])
)(({ children, render, isOpen, toggle, ...props }) => (
  <>
    {children({ isOpen, toggle })}
    {isOpen &&
      'browser' in process &&
      createPortal(
        <Modal id="modal" as="div" alignItems="center" justifyContent="center">
          <a href="javascript:;" onClick={() => toggle(false)} />
          <Box {...props}>{createElement(render, {})}</Box>
        </Modal>,
        document.body
      )}
  </>
))

export interface ModalProps extends BoxProps {
  children: (a: Partial<ModalProps>) => React.ReactNode
  render: React.SFC
  isOpen?: boolean
  isShown?: boolean
  toggle?: (b: boolean) => void
}
