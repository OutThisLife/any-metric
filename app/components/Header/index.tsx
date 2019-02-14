import Text from '@/components/Text'
import withHotkeys from '@/lib/withHotkeys'
import { siteName } from '@/theme'
import { BoxProps } from 'rebass'
import { compose, setDisplayName } from 'recompose'

import Search from './Search'
import Header from './style'

export default compose<HeaderProps, HeaderProps>(
  setDisplayName('header'),
  withHotkeys([
    {
      key: 13,
      action: () => {
        const $s = document.getElementById('s')

        if (document.activeElement !== $s) {
          $s.focus()
        }
      }
    }
  ])
)(() => (
  <Header as="header">
    <Text as="h1" lineHeight={1} fontWeight="100" m={0}>
      {siteName}
    </Text>

    <Search />
  </Header>
))

export type HeaderProps = BoxProps
