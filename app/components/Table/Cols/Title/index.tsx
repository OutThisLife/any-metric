import { compose, defaultProps } from 'recompose'
import styled from 'styled-components'

import { Cols, Props } from '..'

const Title = compose<Props, Props>(defaultProps({ flex: 17 }))(Cols)

export default styled<any>(Title)`
  padding: 15px 0;

  svg {
    width: 13px;
    margin: 0 0 0 5px;
    color: ${({ theme }) => theme.colours.label};
  }

  .row:not(:hover) & svg {
    visibility: hidden;
  }

  > a {
    align-self: stretch;
    display: inline-flex;
    align-items: center;
  }
`
