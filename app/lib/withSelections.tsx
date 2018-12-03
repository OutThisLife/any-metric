import { withHandlers } from 'recompose'

export default withHandlers<SelectionsProps, SelectionsProps>(() => ({
  handleMouse: ({ afterMouseDown = () => null }) => ({
    currentTarget: $parent,
    target,
    shiftKey,
    button
  }) => {
    if (button || !(target instanceof HTMLElement)) {
      return
    }

    const $rows = [].slice.call($parent.getElementsByClassName('row'))
    const $first = $parent.querySelector('[data-checked]')

    const firstIdx = $rows.indexOf($first)
    const idx = $rows.indexOf(target.offsetParent)

    if (shiftKey && $first && firstIdx !== idx) {
      const c = firstIdx < idx ? idx : firstIdx
      let n = firstIdx < idx ? firstIdx + 1 : idx

      while (n !== c) {
        select($rows[n++])
      }
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
  const $parent = el.classList.contains('row') ? el : el.closest('.row')

  if (!($parent instanceof HTMLElement)) {
    return
  }

  if (el instanceof HTMLInputElement) {
    $parent.classList.remove('seen')
    el.checked = !el.checked
  } else if ($parent.classList.contains('seen')) {
    return
  } else {
    const $input = $parent.querySelector('[type="checkbox"]')

    if ($input instanceof HTMLInputElement) {
      $input.checked = !$input.checked
    }
  }

  $parent.classList.add('seen')
  $parent.toggleAttribute('data-checked')

  const $grandParent = $parent.closest('.row-parent')

  if ($grandParent instanceof HTMLElement) {
    if ($grandParent.querySelector('[data-checked]')) {
      $grandParent.setAttribute('data-checked', 'true')
    } else {
      $grandParent.removeAttribute('data-checked')
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
