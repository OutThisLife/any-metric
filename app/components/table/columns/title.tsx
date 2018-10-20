import Dropdown from '@/components/dropdown'
import withTags, { THandles } from '@/lib/withTags'
import { MdLabelOutline } from 'react-icons/md'
import { compose, setDisplayName, withHandlers } from 'recompose'

import { Cell } from '.'
import { Title } from './style'

interface TOutter extends Cell<string> {
  filterData: (t: string) => void
}

interface TInner extends TOutter, THandles {
  tags: string[]
}

interface TInnerHandles {
  handleClick: (t: string) => void
}

export default compose<TInner & THandles & TInnerHandles, TOutter>(
  setDisplayName('col-title'),
  withTags(),
  withHandlers<TInner, TInnerHandles>(() => ({
    handleClick: ({ setTag, rowData }) => t => setTag(rowData, t)
  }))
)(
  ({
    handleClick,
    tags,
    filterData,
    rowData: { id, copy, tags: curTags },
    cellData: title
  }) => (
    <Title>
      <h4 title={id}>
        <Dropdown label={<MdLabelOutline />}>
          {Label =>
            tags
              .sort()
              .map(t => (
                <Label
                  key={`tag-${t}`}
                  title={t}
                  initChecked={curTags.includes(t)}
                  onClick={() => handleClick(t)}
                />
              ))
          }
        </Dropdown>

        <a
          href="javascript:;"
          target="_blank"
          rel="noopener"
          dangerouslySetInnerHTML={{ __html: title }}
        />
      </h4>

      <div>
        <span dangerouslySetInnerHTML={{ __html: copy }} />
        <span>
          {curTags.filter(t => t).map(t => (
            <label
              key={`label-${t}`}
              data-tag={t}
              onClick={() => filterData(t)}
              dangerouslySetInnerHTML={{ __html: t }}
            />
          ))}
        </span>
      </div>
    </Title>
  )
)
