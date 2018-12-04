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

      <Form.Container>
        <Form.Input tabIndex={1} placeholder="Search for a product">
          <IoIosSearch />
        </Form.Input>
      </Form.Container>

      <Picker />
    </Header>
  )
)

export type HeaderProps = BoxProps
