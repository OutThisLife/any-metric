import styled from 'styled-components'

import { TOutter } from '.'

export default styled<TOutter, 'a'>('a').attrs({
  style: ({ checked }) => ({
    fontWeight: checked ? 700 : 400
  })
})`
  svg {
    display: inline-block;
    vertical-align: middle;
    margin: -0.2em 0.5em 0 -0.5em;
  }
`
