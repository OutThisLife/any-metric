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
        console.log(tab)
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
      z-index: 500;
      padding: 5px;
      background: ${prop('theme.bg')};

      @media (min-width: 1025px) {
        position: absolute;
        top: 0;
        right: 0;
      }

      @media (max-width: 1025px) {
        display: block;
        position: fixed;
        right: 0;
        bottom: 0;
        left: 0;
        max-height: 33vh;
        overflow: auto;
        border-top: 2px solid ${prop('theme.border')};
      }

      > span {
        display: inline-block;
        font-weight: 700;
        text-transform: uppercase;

        @media (min-width: 1025px) {
          + span {
            margin-left: 1em;
          }

          i {
            margin-left: 0.3em;
          }
        }

        @media (max-width: 1025px) {
          display: flex;
          width: 100%;
          padding: 0.5em 0.25em;

          a {
            order: 2;
          }

          i {
            order: 1;
            margin-right: 0.3em;
          }

          &:last-of-type[style] {
            display: none;
          }
        }

        i {
          cursor: pointer;
          font-style: normal;
          font-size: 90%;
          vertical-align: middle;

          [fill] {
            fill: ${prop('theme.base')};
          }
        }

        @media (min-width: 1025px) {
          &:not(:hover) .delete {
            opacity: 0.2;
          }
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

const Refresh = props => (
  <i className="refresh" {...props}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      width="10"
      height="10"
      preserveAspectRatio="xMinYMin meet">
      <path
        fill="currentColor"
        d="M3.254,6.572c0.008,0.072,0.048,0.123,0.082,0.187c0.036,0.07,0.06,0.137,0.12,0.187C3.47,6.957,3.47,6.978,3.484,6.988c0.048,0.034,0.108,0.018,0.162,0.035c0.057,0.019,0.1,0.066,0.164,0.066c0.004,0,0.01,0,0.015,0l2.934-0.074c0.317-0.007,0.568-0.271,0.56-0.589C7.311,6.113,7.055,5.865,6.744,5.865c-0.005,0-0.01,0-0.015,0L5.074,5.907c2.146-2.118,5.604-2.634,7.971-1.007c2.775,1.912,3.48,5.726,1.57,8.501c-1.912,2.781-5.729,3.486-8.507,1.572c-0.259-0.18-0.618-0.119-0.799,0.146c-0.18,0.262-0.114,0.621,0.148,0.801c1.254,0.863,2.687,1.279,4.106,1.279c2.313,0,4.591-1.1,6.001-3.146c2.268-3.297,1.432-7.829-1.867-10.101c-2.781-1.913-6.816-1.36-9.351,1.058L4.309,3.567C4.303,3.252,4.036,3.069,3.72,3.007C3.402,3.015,3.151,3.279,3.16,3.597l0.075,2.932C3.234,6.547,3.251,6.556,3.254,6.572z"
      />
    </svg>
  </i>
)

const Delete = props => (
  <i className="delete" {...props}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      width="10"
      height="10"
      preserveAspectRatio="xMinYMin meet">
      <path
        fill="currentColor"
        d="M18.693,3.338h-1.35l0.323-1.834c0.046-0.262-0.027-0.536-0.198-0.739c-0.173-0.206-0.428-0.325-0.695-0.325
							H3.434c-0.262,0-0.513,0.114-0.685,0.312c-0.173,0.197-0.25,0.46-0.215,0.721L2.79,3.338H1.307c-0.502,0-0.908,0.406-0.908,0.908
							c0,0.502,0.406,0.908,0.908,0.908h1.683l1.721,13.613c0.057,0.454,0.444,0.795,0.901,0.795h8.722c0.458,0,0.845-0.34,0.902-0.795
							l1.72-13.613h1.737c0.502,0,0.908-0.406,0.908-0.908C19.601,3.744,19.195,3.338,18.693,3.338z M15.69,2.255L15.5,3.334H4.623
							L4.476,2.255H15.69z M13.535,17.745H6.413L4.826,5.193H15.12L13.535,17.745z"
      />
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
