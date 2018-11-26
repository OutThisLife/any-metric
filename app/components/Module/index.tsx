import Box, { BoxProps } from '@/components/Box'
import Heading from '@/components/Heading'
import { BaphoTheme } from '@/theme'
import { rgba } from 'polished'
import { compose, setDisplayName } from 'recompose'
import { withTheme } from 'styled-components'

export default compose<ModuleProps & BaphoTheme, ModuleProps>(
  withTheme,
  setDisplayName('module')
)(({ theme, title, cta, children, ...props }) => (
  <>
    {title && <Heading title={title} cta={cta} />}

    <Box is="div" borderRadius={4} {...props}>
      <Box
        width="calc(100% - (var(--pad) / 2))"
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
    </Box>
  </>
))

export interface ModuleProps extends BoxProps<HTMLDivElement> {
  title?: string
}
