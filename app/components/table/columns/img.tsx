import { Card, Popover } from 'evergreen-ui'

import { Cell } from '.'

interface TOutter extends Cell<string> {}

export default ({ cellData: img, rowData: { title } }: TOutter) => (
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
        onMouseOver={!isShown && toggle}
        onMouseLeave={isShown && toggle}>
        <img src={img} alt={title} style={{ cursor: 'zoom-in' }} />
      </Card>
    )}
  </Popover>
)
