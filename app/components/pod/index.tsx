import 'react-virtualized/styles.css'

import { IoIosLink, IoLogoReddit, IoLogoTwitter, IoMdImage, IoMdOpen } from 'react-icons/io'
import { AutoSizer, Column, Table } from 'react-virtualized'

import Pod from './styled'
import Title from './title'

interface TOutter {
  name: string
  children?: React.ReactNode
  data:
    | Array<{
        title: string
        slug: string
        image: string
        copy: string
      }>
    | []
}

export default ({ name, data = [], children, ...props }: TOutter) => (
  <Pod {...props}>
    {children}

    <Title title={name} services={[IoLogoReddit, IoLogoTwitter]} />
    <AutoSizer>
      {({ width, height }) => (
        <Table
          width={width}
          height={height}
          headerHeight={35}
          rowHeight={50}
          rowCount={data.length}
          rowGetter={({ index }) => data[index]}>
          <Column
            label={<IoIosLink />}
            dataKey="slug"
            width={26}
            style={{ margin: 0 }}
            headerStyle={{ margin: 0, textAlign: 'center' }}
            cellRenderer={() => (
              <div className="datasrc">
                {Math.random() > 0.5 ? <IoLogoTwitter /> : <IoLogoReddit />}
                <IoMdOpen />
              </div>
            )}
          />

          <Column
            label={<IoMdImage />}
            dataKey="image"
            width={30}
            headerStyle={{ textAlign: 'center' }}
            cellRenderer={({ cellData, rowData: { title } }) => (
              <figure>
                <img src={cellData} alt={title} />
              </figure>
            )}
          />

          <Column
            label="Content"
            dataKey="title"
            width={100}
            flexGrow={1}
            cellRenderer={({ cellData, rowData: { copy } }) => (
              <div>
                <strong>
                  <span>{cellData}</span> <time title="6/21/90 11:11:11">just now</time>
                </strong>

                <p dangerouslySetInnerHTML={{ __html: copy }} />
              </div>
            )}
          />
        </Table>
      )}
    </AutoSizer>
  </Pod>
)
