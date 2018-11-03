import { Card, Popover } from 'evergreen-ui'
import { compose, setDisplayName } from 'recompose'

import { Cell } from '.'

interface TOutter extends Cell<string> {}

export default (compose<TOutter, TOutter>(setDisplayName('img')) as any)(
  ({ cellData: img, rowData: { title } }) => (
    <Popover
      minWidth={0}
      minHeight={0}
      content={() => (
        <Card padding={0}>
          <img src={img} width={220} />
        </Card>
      )}>
      {({ toggle, isShown, getRef }) => (
        <Card
          innerRef={getRef}
          onMouseOver={!isShown ? toggle : undefined}
          onMouseLeave={isShown ? toggle : undefined}>
          <img src={img} alt={title} style={{ cursor: 'zoom-in' }} />
        </Card>
      )}
    </Popover>
  )
)
