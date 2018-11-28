import Box from '@/components/Box'
import { FakeResult } from '@/server/schema/types'
import { BaphoTheme } from '@/theme'
import { Icon } from 'evergreen-ui'
import { compose, defaultProps, setDisplayName } from 'recompose'
import { withTheme } from 'styled-components'

import { ColumnProps, Table } from '..'
import Title from './style'

export default compose<TitleProps & BaphoTheme, TitleProps>(
  defaultProps<TitleProps>({
    name: 'title',
    position: 'relative',
    flex: 17
  }),
  withTheme,
  setDisplayName('col-title')
)(({ theme, children, item = {}, ...props }) => (
  <Title {...props}>
    {!('id' in item) ? (
      children
    ) : (
      <>
        <Box is="figure" display="block" flexBasis={35} margin={0}>
          <img src={item.image} data-src={item.image} alt={item.title} />
        </Box>

        <Box
          position="relative"
          width="100%"
          overflow="hidden"
          textOverflow="ellipsis"
          paddingRight="2rem"
          paddingLeft="1rem">
          <a
            href={item.slug}
            target="_blank"
            rel="noopener"
            style={{
              zIndex: 1,
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              left: 0
            }}
          />

          <Table.Text is="a" href={item.slug} fontSize="1rem" fontWeight={500}>
            {item.title} <Icon icon="document-open" />
          </Table.Text>

          <Table.Text is="p" whiteSpace="nowrap" color={theme.colours.muted}>
            {item.copy}
          </Table.Text>
        </Box>
      </>
    )}
  </Title>
))

interface TitleProps extends ColumnProps {
  item?: FakeResult
}
