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
        boxShadow={`0 0 1px ${rgba(
          theme.colours.panel,
          0.2
        )}, 0 16px 24px -8px ${rgba(theme.colours.panel, 0.5)}`}
        borderWidth="1px"
        borderStyle="solid"
        borderRadius="inherit"
        borderTopWidth={0}
        borderBottomColor="#1e2233"
        borderLeftColor="#122263"
        borderRightColor="#232b4a"
        background={theme.colours.moduleBg}
        padding="var(--pad)">
        {children}
      </Box>
    </Module>
  </>
))

export interface ModuleProps extends BoxProps<HTMLDivElement> {
  title?: string
}
