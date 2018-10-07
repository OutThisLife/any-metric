import { colours } from '@/theme'
import { IoMdArrowDown, IoMdArrowUp } from 'react-icons/io'
import { compose, withProps } from 'recompose'

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
  <>
    <label>{title}</label>

    <strong>
      {num}{' '}
      <span style={{ color: isUp ? colours.good : colours.bad }}>
        {isUp ? <IoMdArrowUp /> : <IoMdArrowDown />} {perc}%
      </span>
    </strong>
  </>
))
