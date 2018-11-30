import Box, { ReactBox } from '@/components/Box'
import { BaphoTheme } from '@/theme'
import { rgba } from 'polished'
import styled, { css } from 'styled-components'

const LI = props => <Box is="li" {...props} />
const UL = props => <Box is="ul" {...props} />

const Category = styled<any>(LI)`
  ${({ theme }: BaphoTheme) => css`
    outline: 1px solid transparent;
    border: 1px solid;
    border-image: linear-gradient(
        180deg,
        ${rgba(theme.colours.label, 0.2)},
        transparent
      )
      1;
    transition: ${theme.eases.base};
    background: transparent;

    &:hover {
      outline-color: ${theme.colours.focus};
    }
  `}
` as ReactBox<HTMLLIElement> & CategoryProps

Category.Children = styled<any>(UL)``

export interface CategoryProps {
  Children?: ReactBox<{}, HTMLUListElement>
}

export default Category
