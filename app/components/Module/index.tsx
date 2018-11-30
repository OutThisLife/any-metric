import Box, { BoxProps } from '@/components/Box'
import Heading from '@/components/Heading'
import { BaphoTheme } from '@/theme'
import { rgba } from 'polished'
import { compose, setDisplayName } from 'recompose'
import { withTheme } from 'styled-components'

import Module from './style'

export default compose<ModuleProps & BaphoTheme, ModuleProps>(
  withTheme,
  setDisplayName('module')
)(({ theme, children, title, cta, ...props }) => (
  <>
    {title && <Heading title={title} cta={cta} paddingBottom={15} />}

    <Module {...props}>
      <Box
        padding="var(--pad)"
        boxShadow={`0 0 1px ${rgba(
          theme.colours.panel,
          0.2
        )}, 0 16px 24px -8px ${rgba(theme.colours.panel, 0.5)}`}
        borderWidth="1px"
        borderStyle="solid"
        borderColor="#20294B"
        borderRadius={4}
        background={theme.colours.moduleBg}>
        {children}
      </Box>
    </Module>
  </>
))

export interface ModuleProps extends BoxProps<HTMLDivElement> {
  title?: string
}
