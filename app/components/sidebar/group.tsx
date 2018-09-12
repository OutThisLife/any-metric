import { MouseEvent } from 'react'
import { FiChevronDown } from 'react-icons/fi'
import { compose, withHandlers } from 'recompose'
import styled from 'styled-components'

interface TOutter {
  title: string
  children: React.ReactNode
}

interface TInner {
  onRef: (a: HTMLDivElement) => void
  handleClick: (e: MouseEvent<any>) => void
}

export default compose<TInner & TOutter, TOutter>(
  withHandlers<{}, TInner>(() => ({
    onRef: () => ref => {
      if (!ref) {
        return
      }

      window.requestAnimationFrame(() => (ref.style.maxHeight = `${ref.scrollHeight}px`))
    },

    handleClick: () => ({ currentTarget }) => {
      const $group = currentTarget.nextElementSibling

      window.requestAnimationFrame(() => ($group.style.maxHeight = `${$group.scrollHeight}px`))
      currentTarget.classList.toggle('collapsed')
    }
  }))
)(({ onRef, handleClick, title, children }) => (
  <Group>
    <h5 onClick={handleClick}>
      {title} <FiChevronDown />
    </h5>

    <div ref={onRef}>{children}</div>
  </Group>
))

const Group = styled.section`
  + section {
    margin-top: var(--pad);
    padding-top: var(--pad);
    border-top: 1px solid ${({ theme }) => theme.colours.border};
  }

  h5 {
    user-select: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    margin: calc(var(--pad) / 3) var(--pad);

    svg {
      margin-left: auto;
      transition: transform 0.1s linear;

      aside:not(:hover) & {
        opacity: 0.1;
      }
    }

    &:not(.collapsed) svg {
      transform: rotate(180deg);
    }

    &.collapsed + div {
      max-height: 0px !important;
    }
  }

  &:not(:hover) h5 {
    opacity: 0.4;
  }

  div {
    overflow: hidden;
    transition: max-height 0.1s linear;

    a {
      font-size: 12px;
    }
  }
`
