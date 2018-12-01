import Box, { BoxProps } from '@/components/Box'
import Heading from '@/components/Heading'
import { BaphoTheme } from '@/theme'
import { compose, setDisplayName } from 'recompose'
import { withTheme } from 'styled-components'

import Module from './style'

export default compose<ModuleProps & BaphoTheme, ModuleProps>(
  withTheme,
  setDisplayName('module')
)(({ theme, children, title, cta, ...props }) => (
  <>
    {title && <Heading title={title} cta={cta} />}

    <Module marginTop="1rem" {...props}>
      <Box
        padding="var(--pad)"
        borderRadius={4}
        background={theme.colours.module}>
        {children}
      </Box>
    </Module>
  </>
))

export interface ModuleProps extends BoxProps<HTMLDivElement> {
  title?: string
}
