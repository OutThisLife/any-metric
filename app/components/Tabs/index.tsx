import { GET_TAGS, REMOVE_DOC } from '@/lib/queries'
import { Tag } from '@/server/schema/types'
import { ApolloClient } from 'apollo-boost'
import { func } from 'prop-types'
import { graphql, MutationFn, withApollo } from 'react-apollo'
import { Flex } from 'rebass'
import {
  compose,
  getContext,
  setDisplayName,
  withHandlers,
  withStateHandlers
} from 'recompose'
import { prop } from 'styled-tools'

import { TimesHandlers } from '../Times'

export default compose<TimesTabsProps & TimesTabsHandles, {}>(
  setDisplayName('chart-times-tabs'),
  getContext({ updateChart: func }),
  withApollo,
  withStateHandlers(
    {
      tab: ''
    },
    {
      setTab: (_, { updateChart }: TimesHandlers) => tab => {
        updateChart(
          tab.length
            ? {
                tags: {
                  $in: [tab]
                }
              }
            : {}
        )

        return { tab }
      }
    }
  ),
  graphql<{}, { tags: Tag[] }>(GET_TAGS, {
    props: ({ data: { tags = [], ...data } }) => ({
      data,
      tags
    })
  }),
  graphql<TimesTabsProps>(REMOVE_DOC, {
    props: ({ mutate, data, ownProps: { client } }) => ({
      data,
      mutate: async opts => {
        await mutate(opts)
        await client.reFetchObservableQueries()
      }
    })
  }),
  withHandlers<TimesTabsProps, TimesTabsHandles>(({ mutate }) => ({
    handleFlush: () => () =>
      window.confirm('Are you sure?') &&
      mutate({ variables: { collectionName: 'allTags' } }),

    handleDrop: () => e =>
      e.currentTarget instanceof HTMLElement &&
      mutate({
        variables: {
          objectId: e.currentTarget.dataset.id,
          collectionName: 'tags'
        }
      }),

    handleRefresh: ({ client }) => () => client.reFetchObservableQueries()
  }))
)(({ tags = [], tab, setTab, handleRefresh, handleFlush, handleDrop }) => (
  <Flex
    as="nav"
    css={`
      justify-content: flex-end;
      max-width: 100%;
      overflow: auto;
      white-space: nowrap;
      background: ${prop('theme.bg')};

      @media (max-width: 1025px) {
        padding: var(--pad) 0;
      }

      > span {
        display: inline-flex;
        align-items: center;
        font-weight: 700;
        text-transform: uppercase;

        i {
          cursor: pointer;
          margin-left: 0.3em;

          &.refresh svg {
            stroke: ${prop('theme.brand')};
          }
        }

        &:not(:hover) .delete {
          visibility: hidden;
        }
      }
    `}>
    {tags.map(t => (
      <span key={t._id} className={tab === t._id ? 'active' : ''}>
        <a href="javascript:;" onClick={() => setTab(t._id)}>
          {t.title}
        </a>

        <Delete data-id={t._id} onClick={handleDrop} />
      </span>
    ))}

    <span className={tab === '' ? 'active' : ''}>
      <a href="javascript:;" onClick={() => setTab('')}>
        Everything
      </a>

      <Delete onClick={handleFlush} />
    </span>

    <span style={{ marginLeft: 5 }}>
      <Refresh onClick={handleRefresh} />
    </span>
  </Flex>
))

const Refresh = ({ size = 14, ...props }) => (
  <i className="refresh" {...props}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1"
      stroke-linecap="square"
      stroke-linejoin="arcs">
      <path d="M2.5 2v6h6M21.5 22v-6h-6" />
      <path d="M22 11.5A10 10 0 0 0 3.2 7.2M2 12.5a10 10 0 0 0 18.8 4.2" />
    </svg>
  </i>
)

const Delete = ({ size = 14, ...props }) => (
  <i className="delete" {...props}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1"
      stroke-linecap="square"
      stroke-linejoin="arcs">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <line x1="10" y1="11" x2="10" y2="17" />
      <line x1="14" y1="11" x2="14" y2="17" />
    </svg>
  </i>
)

export interface TimesTabsProps {
  tab?: string
  setTab?: (a: string) => void
  tags?: Tag[]
  client?: ApolloClient<{}>
  mutate?: MutationFn
}

export interface TimesTabsHandles {
  handleDrop: React.MouseEventHandler<HTMLAnchorElement>
  handleFlush: React.MouseEventHandler<HTMLAnchorElement>
  handleRefresh: React.MouseEventHandler<HTMLAnchorElement>
}
