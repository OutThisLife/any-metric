import { MouseEvent } from 'react'

interface TInner {
  i?: string
  size?: number | string
  onClick?: (e?: MouseEvent<HTMLSpanElement>) => void
}

export default ({ i, size = '50%', onClick = () => null }: TInner) => (
  <span
    className="oi"
    data-glyph={i}
    onClick={onClick}
    style={{
      fontSize: size,
      transition: 'none'
    }}
  />
)
