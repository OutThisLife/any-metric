import { withHandlers } from 'recompose'

export default withHandlers<{}, SelectionsProps>(() => ({
  handleMouse: () => ({ currentTarget: $parent, target, shiftKey, button }) => {
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

    select(target)

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
  }
}))

export const select = (el: HTMLElement | HTMLInputElement) => {
  const $parent = el.closest('.row')

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

  if ($parent.hasAttribute('data-checked')) {
    $parent.removeAttribute('data-checked')
  } else {
    $parent.setAttribute('data-checked', null)
  }
}

export interface SelectionsProps {
  handleMouse?: React.MouseEventHandler<HTMLElement>
}
