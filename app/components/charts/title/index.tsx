import { colours } from '@/theme'
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md'
import { compose, withProps } from 'recompose'
import styled from 'styled-components'

interface TOutter {
  title: string
  num: string | number
  perc: string | number
}

interface TInner {
  isUp: boolean
}

export default compose<TInner & TOutter, TOutter>(
  withProps<TInner, TOutter>(props => ({
    ...props,
    isUp: +props.num > 0
  }))
)(({ isUp, title, num, perc }) => (
  <Title>
    <label>{title}</label>

    <strong>
      {num}{' '}
      <span style={{ color: isUp ? colours.good : colours.bad }}>
        {isUp ? <MdArrowDropUp /> : <MdArrowDropDown />} {perc}%
      </span>
    </strong>
  </Title>
))

const Title = styled.div`
  white-space: nowrap;
  width: auto;
  padding: 0 calc(var(--pad) * 2) 0 var(--pad);

  label,
  strong {
    display: block;
  }

  strong {
    font-size: 1.5rem;
    line-height: 1;
  }
`
