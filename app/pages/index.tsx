import 'react-virtualized/styles.css'

import { colours } from '@/theme'
import { commerce, internet, lorem, seed } from 'faker'
import { AutoSizer, CellMeasurer, CellMeasurerCache, MultiGrid } from 'react-virtualized'
import styled from 'styled-components'

const cache = new CellMeasurerCache({
  defaultWidth: 100,
  minWidth: 75,
  minHeight: 40
})

export default () => {
  seed(100)

  const data = [...Array(255).keys()].map(i => ({
    image: internet.avatar(),
    title: commerce.productName(),
    status: i < 2 ? 'unread' : 'read',
    price: commerce.price(),
    copy: lorem.paragraph(),
    slug: lorem.slug(),
  }))

  const columns = Object.keys(data[0])

  const cellRender = ({ columnIndex, key, parent, rowIndex, style }) => {
    const col = columns[columnIndex]
    let content = data[rowIndex][col]

    if (col === 'image') {
      content = <img width={20} src={content} />
    }

    return (
      <CellMeasurer key={key} cache={cache} parent={parent} columnIndex={columnIndex} rowIndex={rowIndex}>
        <div tabIndex={-1} className={`Cell Cell-${columns[columnIndex]} Row-${rowIndex}`} style={style}>
          {rowIndex === 0 ? col : content}
        </div>
      </CellMeasurer>
    )
  }

  return (
    <Home>
      <AutoSizer defaultHeight={300}>
        {({ width, height }) => (
          <MultiGrid
            cellRenderer={cellRender}
            width={width}
            height={height}
            rowCount={data.length}
            rowHeight={cache.rowHeight}
            columnCount={columns.length}
            columnWidth={cache.columnWidth}
            deferredMeasurementCache={cache}
            fixedColumnCount={2}
            fixedRowCount={1}
            scrollToColumn={0}
            scrollToRow={0}
            enableFixedColumnScroll
            enableFixedRowScroll
            hideTopRightGridScrollbar
            hideBottomLeftGridScrollbar
            styleBottomLeftGrid={{
              borderRight: `1px solid ${colours.darkBorder}`,
              backgroundColor: 'rgba(0,0,0,0.01)'
            }}
            styleTopLeftGrid={{
              borderBottom: `1px solid ${colours.darkBorder}`,
              borderRight: `1px solid ${colours.darkBorder}`,
              fontWeight: 700
            }}
            styleTopRightGrid={{
              borderBottom: `1px solid ${colours.darkBorder}`,
              fontWeight: 700
            }}
          />
        )}
      </AutoSizer>
    </Home>
  )
}

const Home = styled.div`
  display: flex;
  min-height: 100%;

  .Cell {
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid ${({ theme }) => theme.colours.border};
    border-right: 1px solid ${({ theme }) => theme.colours.border};
    padding: 0 7px;

    &:not(.Row-0) {
      &:focus {
        outline: 5px auto -webkit-focus-ring-color;
      }

      &.Cell-title,
      &.Cell-slug,
      &.Cell-copy,
      &.Cell-image {
        justify-content: normal;
      }
    }
  }
`
