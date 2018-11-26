import Box from '@/components/Box'
import Form from '@/components/Form'
import Heading from '@/components/Heading'
import { BaphoTheme } from '@/theme'
import { compose, setDisplayName } from 'recompose'
import { withTheme } from 'styled-components'

export default compose<HeaderProps, {}>(
  withTheme,
  setDisplayName('header')
)(({ theme: { colours: { brand } } }) => (
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
        backgroundImage={brand}
      />
    </Box>

    <Box marginLeft="auto">
      <Form groupFields>
        <Form.Input
          zIndex={1}
          tabIndex={1}
          placeholder="Enter product name &hellip;"
          borderRadius={32}
        />

        <Form.Button zIndex={2} iconBefore="plus" iconSize={32} />
      </Form>
    </Box>
  </Box>
))

export type HeaderProps = BaphoTheme
