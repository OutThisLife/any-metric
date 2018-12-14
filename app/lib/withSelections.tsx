import { withHandlers } from 'recompose'
import { resolve } from 'url'

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

  const isChecked = !$row.hasAttribute('data-checked')
  $row.classList.add('seen')

  //
  ;[].slice
    .call(document.querySelectorAll('[data-checked]'))
    .forEach(($sib: HTMLElement) => $sib.removeAttribute('data-checked'))

  if (isChecked) {
    $row.toggleAttribute('data-checked')

    if ($row.hasAttribute('data-hash')) {
      window.history.replaceState(
        {},
        null,
        resolve(location.href, $row.dataset.hash)
      )
    }
  }

  $row.classList.remove('seen')

  if (typeof cb === 'function') {
    window.requestAnimationFrame(cb)
  }
}

export interface SelectionsProps {
  handleMouse?: React.MouseEventHandler<HTMLElement>
}
