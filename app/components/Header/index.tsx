import Text from '@/components/Text'
import { siteName } from '@/theme'
import { BoxProps } from 'rebass'
import { compose, setDisplayName } from 'recompose'

import Picker from './Picker'
import Search from './Search'
import Header from './style'

export default compose<HeaderProps, HeaderProps>(setDisplayName('header'))(
  () => (
    <Header as="header">
      <Text as="h1" lineHeight={1} fontWeight="100" m={0}>
        {siteName}
      </Text>

      <Search />

      <Picker />
    </Header>
  )
)

export type HeaderProps = BoxProps
