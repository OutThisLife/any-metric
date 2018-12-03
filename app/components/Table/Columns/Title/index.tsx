import { FakeResult } from '@/server/schema/types'
import { BaphoTheme } from '@/theme'
import { MdOpenInNew } from 'react-icons/md'
import { Box, Flex } from 'rebass'
import { compose, setDisplayName } from 'recompose'
import { withTheme } from 'styled-components'

import { Text } from '../../style'
import { ColumnProps } from '../Column'
import Title from './style'

export default compose<TitleProps & BaphoTheme, TitleProps>(
  setDisplayName('col-title'),
  withTheme
)(({ theme, children, item = {} }) => (
  <Title
    name="title"
    p={0}
    css={`
      text-align: left;
    `}>
    {!('id' in item) ? (
      children
    ) : (
      <Flex
        alignItems="center"
        css={`
          padding: calc(var(--pad) / 4) 0;
        `}>
        <Box
          as="figure"
          m={0}
          css={`
            display: block;
            flex-basis: 35px;
          `}>
          <img src={item.image} data-src={item.image} alt={item.title} />
        </Box>

        <Box
          pl={12}
          pr={12}
          css={`
            position: relative;
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
          `}>
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

          <Text as="a" href={item.slug} fontWeight="500">
            {item.title} <MdOpenInNew />
          </Text>

          <Text
            as="p"
            css={`
              display: inline-block;
              color: ${theme.colours.muted};
              font-size: 0.9em;
              white-space: nowrap;
              margin: 0;
            `}>
            {item.copy}
          </Text>
        </Box>
      </Flex>
    )}
  </Title>
))

interface TitleProps extends ColumnProps {
  item?: FakeResult
}
