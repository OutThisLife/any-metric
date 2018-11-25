import Box from '@/components/Box'
import Text from '@/components/Text'
import { compose, setDisplayName } from 'recompose'
import { withTheme } from 'styled-components'
import { BaphoTheme } from 'typings'

export default compose<BaphoTheme, {}>(
  withTheme,
  setDisplayName('header')
)(({ theme }) => (
  <Box
    is="header"
    contain="layout"
    display="flex"
    alignItems="center"
    justifyContent="space-between"
    paddingY="var(--pad)"
    paddingX="calc(var(--pad) * 2)">
    <Box>
      <Text
        is="h1"
        fontSize="1rem"
        fontFamily={theme.fonts.family}
        textTransform="uppercase"
        letterSpacing={-1}
        backgroundImage={theme.colours.brand}>
        baphometric
      </Text>
    </Box>

    <Box>.</Box>
  </Box>
))
