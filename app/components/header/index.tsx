import Box from '@/components/Box'
import { compose, setDisplayName } from 'recompose'
import { withTheme } from 'styled-components'
import { BaphoTheme } from 'typings'

import Form from '../Form'
import Heading from '../Heading'

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
    padding="var(--offset)"
    paddingTop="calc(var(--pad) * 2)"
    paddingBottom={0}>
    <Box>
      <Heading
        is="h1"
        title="baphometric"
        fontSize="1.1rem"
        textTransform="uppercase"
        backgroundImage={theme.colours.brand}
      />
    </Box>

    <Box marginLeft="auto">
      <Form display="inline-flex" alignItems="center">
        <Form.Input
          placeholder="Enter product name &hellip;"
          marginRight="-2em"
          borderRadius={32}
          paddingRight="calc(var(--pad) * 2)"
        />

        <Form.Button
          zIndex={1}
          position="relative"
          iconBefore="plus"
          iconSize={32}
        />
      </Form>
    </Box>
  </Box>
))
