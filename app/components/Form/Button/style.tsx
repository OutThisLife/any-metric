import { Button, IconButton } from 'evergreen-ui'
import { lighten, rgba } from 'polished'
import { branch, defaultProps, renderComponent } from 'recompose'
import styled, { css } from 'styled-components'

const BaseButton = branch(
  props => 'iconSize' in props,
  renderComponent(defaultProps({ borderRadius: '100em' })(IconButton))
)(Button)

export default styled<any>(BaseButton)`
  ${({ theme }) => css`
    cursor: pointer;
    display: inline-block;

    * {
      cursor: pointer;
    }

    &[type] {
      color: ${theme.colours.base};
      transition: 0.3s ease-in-out;
      box-shadow: 1px 1px 20px -2px ${rgba(theme.colours.secondary, 0)};
      background: ${theme.inputs.button};

      &:not([disabled]):hover,
      &:not([disabled]):focus {
        color: ${theme.colours.base};
        box-shadow: 1px 1px 20px -2px ${rgba(lighten(0.2, theme.colours.secondary), 0.7)};
        background: ${theme.inputs.button};
      }
    }

    svg:only-child {
      width: 16px;
      height: auto;
      max-width: none;
      margin: auto;
      filter: drop-shadow(0 0 2px rgba(0, 0, 0, 0.2));
      transform: translate(0, -0.12em);
    }
  `}
`
