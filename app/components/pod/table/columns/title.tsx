import Dropdown from '@/components/dropdown'
import { getTags } from '@/lib/queries'
import { Args as SetTagArgs } from '@/server/schema/mutations/setTags'
import { darken, rgba } from 'polished'
import { MutationFunc } from 'react-apollo'
import { MdLabelOutline } from 'react-icons/md'
import {
  compose,
  onlyUpdateForKeys,
  setDisplayName,
  StateHandler,
  StateHandlerMap,
  withStateHandlers
} from 'recompose'
import styled, { css } from 'styled-components'

import { Cell } from '.'

interface TOutter extends Cell<string> {
  filterData: (t: string) => void
}

interface TInner {
  tags: string[]
  mutate: MutationFunc<{}, SetTagArgs>
}

interface TState {
  curTags: string[]
}

interface TStateHandles extends StateHandlerMap<TState> {
  setTag: StateHandler<TState>
}

export default compose<TState & TStateHandles & TInner & TOutter, TOutter>(
  setDisplayName('col-title'),
  getTags(),
  withStateHandlers<TState, TStateHandles, TInner & TOutter>(
    ({ rowData: { tags: curTags } }) => ({ curTags }),
    {
      setTag: ({ curTags }, { rowData: { id, ...data }, mutate }) => (
        t: string
      ) => {
        const ids: string[] = [id]
        const tags: string[] = [].slice.call(curTags)

        if (curTags.includes(t)) {
          tags.splice(tags.indexOf(t), 1)

          if (!tags.length) {
            tags.push('')
          }
        } else {
          tags.push(t)
        }

        mutate({
          variables: { ids, tags },
          optimisticResponse: {
            __typename: 'Mutation',
            setTags: {
              __typename: 'setTags',
              id,
              tags,
              ...data
            }
          }
        })

        return { curTags: tags }
      }
    }
  ),
  onlyUpdateForKeys(['curTags'])
)(
  ({
    setTag,
    tags,
    curTags,
    cellData: title,
    rowData: { copy },
    filterData
  }) => (
    <Title>
      {console.log(curTags)}
      <h4>
        <Dropdown label={<MdLabelOutline />}>
          {Item =>
            tags
              .sort()
              .map(t => (
                <Item
                  key={`tag-${t}`}
                  title={t}
                  checked={curTags.includes(t)}
                  onClick={() => setTag(t)}
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
        <span>{copy}</span>
        <span>
          {curTags.filter(t => t).map(t => (
            <label key={`label-${t}`} onClick={() => filterData(t)}>
              {t}
            </label>
          ))}
        </span>
      </div>
    </Title>
  )
)

const Title = styled.div`
${({ theme }) => css`
  h4 {
    font-size: 1rem;
    font-family: ${theme.fonts.family.copy};

    > * {
      vertical-align: middle;
    }

    > div {
      margin-right: 0.5em;

      [class$='Table__row']:not(:hover) & > a:only-child {
        opacity: 0.4;
      }
    }

    > a {
      text-decoration: none;

      [class$='Table__row']:hover & {
        text-decoration: underline;
      }
    }
  }

  > div {
    display: flex;
    align-items: baseline;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    span:first-of-type {
      flex: 1 0 50%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    span:last-of-type {
      margin-left: 8px;

      [class$='Table__row']:not(:hover) & {
        opacity: 0.75;
      }
    }
  }

  label {
    cursor: pointer;
    color: ${theme.colours.base};
    font-size: 0.9em;
    padding: 1px 5px;
    border: 1px solid ${theme.colours.label};
    border-radius: 2px;
    background: ${theme.colours.label};

    [class$='Table__row']:not(:hover) & {
      color: ${rgba(theme.colours.base, 0.7)};
      background: ${rgba(theme.colours.label, 0.1)};
    }

    &:hover {
      border-color: ${darken(0.25, theme.colours.label)};
    }

    + * {
      margin-left: 3px;
    }
  }
`}
  }
`
