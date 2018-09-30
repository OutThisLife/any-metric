import 'react-virtualized/styles.css'

import { commerce, internet, lorem, seed } from 'faker'
import { AutoSizer, Column, Table, WindowScroller } from 'react-virtualized'
import styled from 'styled-components'

export default () => {
  seed(100)

  const data = [...Array(255).keys()].map(i => ({
    image: internet.avatar(),
    title: commerce.productName(),
    status: i < 2 ? 'unread' : 'read',
    price: commerce.price(),
    copy: lorem.paragraph(),
    slug: lorem.slug()
  }))

  if (typeof document === 'undefined') {
    return null
  }

  return (
    <Home>
      <WindowScroller scrollElement={document.getElementById('app')}>
        {({ height, isScrolling, onChildScroll, scrollTop }) => (
          <AutoSizer disableHeight>
            {({ width }) => (
              <Table
                ref="Table"
                rowGetter={({ index }) => data[index]}
                width={width}
                height={height}
                autoHeight
                headerHeight={30}
                rowCount={data.length}
                rowHeight={150}
                isScrolling={isScrolling}
                onScroll={onChildScroll}
                scrollTop={scrollTop}>

                <Column
                  width={100}
                  label="Image"
                  dataKey="image"
                  cellRenderer={({ cellData }) => (
                    <figure>
                      <img width={100} src={cellData} alt="" />
                    </figure>
                  )}
                />

                <Column width={100} label="Title" dataKey="title" flexGrow={1} />
              </Table>
            )}
          </AutoSizer>
        )}
      </WindowScroller>
    </Home>
  )
}

const Home = styled.div`
  display: flex;

  > div {
    flex: 1 1 auto;
  }

  &[style*="will-change"] {
    will-change: unset !important;
  }

  figure {
    margin: 0;
  }

  .ReactVirtualized__Table__headerRow {
    text-transform: none;
  }
`
