import Box, { BoxProps } from '@/components/Box'
import Form from '@/components/Form'
import Text from '@/components/Text'
import { BaphoTheme } from '@/theme'
import { compose, setDisplayName } from 'recompose'
import { withTheme } from 'styled-components'

import Picker from './Picker'

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
    paddingX="var(--offset)"
    paddingBottom="var(--pad)">
    <Text
      is="h1"
      fontSize="1.1rem"
      lineHeight={1}
      color={theme.colours.base}
      fontFamily={theme.fonts.family.title}
      textTransform="uppercase"
      fontWeight={100}
      margin={0}>
      ɮΔքɦօʍɛ✞ʀɨƈ
    </Text>

    <Picker />

    <Form groupFields>
      <Form.Input
        zIndex={1}
        tabIndex={1}
        placeholder="Enter product name &hellip;"
        backgroundColor="transparent"
      />

      <Form.Button zIndex={2} icon="plus" iconSize={32} />
    </Form>
  </Box>
))

export type HeaderProps = BoxProps<HTMLDivElement>
