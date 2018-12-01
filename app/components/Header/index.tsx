import Box, { BoxProps } from '@/components/Box'
import Form from '@/components/Form'
import Text from '@/components/Text'
import { BaphoTheme } from '@/theme'
import { compose, setDisplayName } from 'recompose'
import { withTheme } from 'styled-components'

export default compose<HeaderProps & BaphoTheme, HeaderProps>(
  withTheme,
  setDisplayName('header')
)(({ theme }) => (
  <Box
    is="header"
    gridArea="head"
    display="flex"
    alignItems="center"
    justifyContent="space-between"
    paddingTop="var(--pad)"
    paddingX="var(--offset)">
    <Box>
      <Text
        is="h1"
        fontSize="1.1rem"
        lineHeight={1}
        fontFamily={theme.fonts.family.title}
        textTransform="uppercase"
        fontWeight={100}
        margin={0}
        backgroundImage={theme.colours.brand}>
        ɮΔքɦօʍɛ✞ʀɨƈ
      </Text>
    </Box>

    <Box marginLeft="auto">
      <Form groupFields>
        <Form.Input
          zIndex={1}
          tabIndex={1}
          placeholder="Enter product name &hellip;"
        />

        <Form.Button zIndex={2} icon="plus" iconSize={32} />
      </Form>
    </Box>
  </Box>
))

export type HeaderProps = BoxProps<HTMLDivElement>
