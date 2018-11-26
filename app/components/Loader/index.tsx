import { BaphoTheme } from '@/theme'
import { darken } from 'polished'
import ContentLoader, {
  ContentLoaderProps as LoaderProps
} from 'react-content-loader'
import { compose, withProps } from 'recompose'
import { withTheme } from 'styled-components'

export default compose<LoaderProps, LoaderProps>(
  withTheme,
  withProps<LoaderProps, LoaderProps & BaphoTheme>(({ theme }) => ({
    speed: 1,
    primaryColor: darken(0.15, theme.colours.label),
    secondaryColor: theme.colours.label
  }))
)(ContentLoader)
