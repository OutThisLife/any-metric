import { BaphoTheme } from '@/theme'
import { BreedingRhombusSpinner } from 'react-epic-spinners'
import { Flex, FlexProps } from 'rebass'
import { compose } from 'recompose'
import { withTheme } from 'styled-components'

export default compose<BaphoTheme & LoaderProps, Partial<LoaderProps>>(
  withTheme
)(({ theme, size = 60, ...props }: FlexProps & any) => (
  <Flex
    alignItems="center"
    justifyContent="center"
    css={`
      overflow: hidden;

      @media (max-width: 1025px) {
        padding: var(--pad);
      }
    `}>
    <BreedingRhombusSpinner
      color={theme.border}
      animationDuration={1300}
      size={size}
      style={{}}
      {...props}
    />
  </Flex>
))

export interface LoaderProps {
  size: number
  animationDuration: number
  color: string
  className: string
  style: object
}
