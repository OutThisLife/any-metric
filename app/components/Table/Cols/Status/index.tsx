import Box from '@/components/Box'
import { isOld, pointFormat } from '@/lib/utils'
import { FakeResult } from '@/server/schema/types'
import { BaphoTheme } from '@/theme'
import { compose, setDisplayName, withProps } from 'recompose'
import { withTheme } from 'styled-components'

import { ColumnProps } from '..'
import Status, { StatusText } from './style'

export default compose<StatusProps & BaphoTheme, StatusProps>(
  withProps({
    name: 'bids',
    textAlign: 'center'
  }),
  withTheme,
  setDisplayName('col-status')
)(({ theme, item = {}, children, ...props }) => (
  <Status {...props}>
    {!('id' in item) ? (
      children
    ) : (
      <Box display="flex" flexWrap="wrap" marginX="auto">
        {isOld(item.date, 32) ? (
          <StatusText>Sold</StatusText>
        ) : (
          <>
            <StatusText color={theme.colours.star} lineHeight={2}>
              {pointFormat(parseInt(item.bids, 10))}
            </StatusText>

            <StatusText>bids</StatusText>
          </>
        )}
      </Box>
    )}
  </Status>
))

export interface StatusProps extends ColumnProps {
  item?: FakeResult
}
