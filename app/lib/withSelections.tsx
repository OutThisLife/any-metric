import { withHandlers } from 'recompose'

export default () =>
  withHandlers<SelectionsProps, SelectionsProps>(() => ({
    handleMouse: () => ({ currentTarget: $parent, target, button }) => {
      if (
        button ||
        !(target instanceof HTMLElement) ||
        /img/i.test(target.tagName)
      ) {
        return
      }

      const handleMouseMove: EventListener = ({ target: tgt }) => {
        $parent.classList.add('dragging')

        if (tgt instanceof HTMLElement) {
          select(tgt)
        }
      }

      $parent.addEventListener('mousemove', handleMouseMove)
      $parent.addEventListener(
        'mouseup',
        () => {
          ;[].slice
            .call(document.getElementsByClassName('seen'))
            .forEach(el => el.classList.remove('seen'))

          $parent.classList.remove('dragging')
          $parent.removeEventListener('mousemove', handleMouseMove)
        },
        { once: true }
      )

      select(target)
    }
  }))

export const select = (
  el: HTMLElement | HTMLInputElement,
  cb: () => void = () => null
) => {
  const $row = el.closest('.row')

  if (!($row instanceof HTMLElement) || $row.classList.contains('seen')) {
    return
  }

  $row.classList.add('seen')
  $row.toggleAttribute('data-checked')

  if (typeof cb === 'function') {
    window.requestAnimationFrame(cb)
  }
}

export interface SelectionsProps {
  handleMouse?: React.MouseEventHandler<HTMLElement>
}
