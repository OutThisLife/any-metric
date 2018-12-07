import { withHandlers } from 'recompose'

export default () =>
  withHandlers<SelectionsProps, SelectionsProps>(() => ({
    handleMouse: ({ afterMouseDown = () => null }) => ({
      currentTarget: $parent,
      target,
      button
    }) => {
      if (
        button ||
        !(target instanceof HTMLElement) ||
        /img/i.test(target.tagName)
      ) {
        return
      }

      select(target, afterMouseDown)

      const handleMouseMove: EventListener = ({ target: tgt }) => {
        $parent.classList.add('dragging')

        if (tgt instanceof HTMLElement) {
          select(tgt, afterMouseDown)
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
    }
  }))

export const select = (
  el: HTMLElement | HTMLInputElement,
  cb: () => void = () => null
) => {
  const $row = el.classList.contains('row') ? el : el.closest('.row')

  if (
    !$row ||
    !($row instanceof HTMLElement || $row.classList.contains('seen'))
  ) {
    return
  }

  $row.classList.add('seen')
  $row.toggleAttribute('data-checked')

  const isChecked = $row.hasAttribute('data-checked')
  const isParent = $row.classList.contains('parent')

  const toggle = (e: HTMLElement) =>
    e.toggleAttribute('data-checked', isChecked)

  if (isParent && !isChecked) {
    ;[].slice.call($row.getElementsByClassName('row')).forEach(toggle)
  } else if (!isParent) {
    const $parent = $row.closest('.row.parent')

    if ($parent instanceof HTMLElement && isChecked) {
      toggle($parent)
    }
  }

  if (typeof cb === 'function') {
    window.requestAnimationFrame(cb)
  }
}

export interface SelectionsProps {
  afterMouseDown?: () => void
  handleMouse?: React.MouseEventHandler<HTMLElement>
}
