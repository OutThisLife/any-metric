import Box from '@/components/Box'
import { moneyFormat, numFormat } from '@/lib/utils'
import { FakeResult } from '@/server/schema/types'
import { BaphoTheme } from '@/theme'
import { compose, setDisplayName, withProps } from 'recompose'
import { withTheme } from 'styled-components'

import { Cols, ColumnProps, Table } from '..'

export default compose<PriceProps & BaphoTheme, PriceProps>(
  withProps<PriceProps, PriceProps>({
    flexGrow: 0,
    flexBasis: 80,
    paddingRight: 20,
    textAlign: 'right',
    flexWrap: 'wrap',
    alignItems: 'center',
    alignSelf: 'stretch',
    lineHeight: 0
  }),
  withTheme,
  setDisplayName('col-price')
)(({ theme, children, item = {}, ...props }) => (
  <Cols {...props}>
    {!('id' in item) ? (
      children
    ) : (
      <Box display="inline-block" lineHeight={1.2}>
        <Table.Text
          fontWeight={700}
          backgroundImage={
            Math.random() > 0.2
              ? theme.colours.price.up
              : theme.colours.price.down
          }>
          {moneyFormat(parseFloat(item.price))}
        </Table.Text>

        <Table.Text textAlign="right">
          {numFormat(parseFloat(item.shipping))}
        </Table.Text>
      </Box>
    )}
  </Cols>
))

export interface PriceProps extends ColumnProps {
  item?: FakeResult
}