import * as Form from '@/components/Form'
import Text from '@/components/Text'
import { IoIosSearch } from 'react-icons/io'
import { BoxProps } from 'rebass'
import { compose, setDisplayName } from 'recompose'

import Picker from './Picker'
import Header from './style'

export default compose<HeaderProps, HeaderProps>(setDisplayName('header'))(
  () => (
    <Header as="header">
      <Text as="h1" lineHeight={1} fontWeight="100" m={0}>
        ɮΔքɦօʍɛ✞ʀɨƈ
      </Text>

      <Picker />

      <Form.Container groupFields>
        <Form.Input
          tabIndex={1}
          placeholder="Enter product name &hellip;"
          bg="transparent"
        />

        <Form.Button variant="icon">
          <IoIosSearch size={32} />
        </Form.Button>
      </Form.Container>
    </Header>
  )
)

export type HeaderProps = BoxProps
