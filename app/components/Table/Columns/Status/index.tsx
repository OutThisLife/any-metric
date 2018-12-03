import { TextProps } from '@/components/Text'
import { isOld, pointFormat } from '@/lib/utils'
import { FakeResult } from '@/server/schema/types'
import { BaphoTheme } from '@/theme'
import { Flex } from 'rebass'
import { compose, setDisplayName } from 'recompose'
import { withTheme } from 'styled-components'

import { Text } from '../../style'
import Column, { ColumnProps } from '../Column'

export default compose<StatusProps & BaphoTheme, StatusProps>(
  setDisplayName('col-status'),
  withTheme
)(({ theme, item = {}, children }) => (
  <Column
    name="bids"
    css={`
      text-align: center;
    `}>
    {!('id' in item) ? (
      children
    ) : (
      <Flex
        css={`
          flex-wrap: wrap;
          margin: 0 auto;

          > span {
            display: block;
            width: 100%;
          }
        `}>
        {isOld(item.date, 32) ? (
          <Text
            css={`
              color: ${theme.colours.label};
              font-size: 0.9rem;
            `}>
            Sold
          </Text>
        ) : (
          <>
            <Text
              css={`
                color: ${theme.colours.price.hl};
                font-size: 0.9rem;
                line-height: 2;
              `}>
              {pointFormat(parseInt(item.bids, 10))}
            </Text>

            <Text
              mt={-1}
              css={`
                color: ${theme.colours.label};
                font-size: 0.9rem;
              `}>
              bids
            </Text>
          </>
        )}
      </Flex>
    )}
  </Column>
))

type StatusTextProps = ColumnProps & TextProps

export interface StatusProps extends ColumnProps {
  item?: FakeResult
}
