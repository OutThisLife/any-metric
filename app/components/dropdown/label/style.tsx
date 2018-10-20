import { SVGAttributes } from 'react'
import styled from 'styled-components'

export default styled<
  {
    isChecked: boolean
    style?: SVGAttributes<'a'>
  },
  'a'
>('a').attrs({
  style: ({ isChecked }) => ({
    fontWeight: isChecked ? 700 : 400
  })
})`
  svg {
    display: inline-block;
    vertical-align: middle;
    margin: -0.2em 0.5em 0 -0.5em;
  }
`
