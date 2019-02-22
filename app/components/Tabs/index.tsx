import { MODIFY_DOC } from '@/lib/queries'
import { Tag, View } from '@/server/schema/types'
import { ApolloClient } from 'apollo-boost'
import { func, object } from 'prop-types'
import { graphql, MutationFn, withApollo } from 'react-apollo'
import { Flex } from 'rebass'
import {
  compose,
  getContext,
  setDisplayName,
  withHandlers,
  withState
} from 'recompose'
import { prop } from 'styled-tools'

export default compose<TimesTabsProps & TimesTabsHandles, {}>(
  setDisplayName('chart-times-tabs'),
  withApollo,
  getContext({ session: object, setInput: func }),
  withState('tab', 'setTab', ''),
  graphql<TimesTabsProps>(MODIFY_DOC, {
    props: ({ mutate, data, ownProps: { client, session } }) => ({
      data,
      modify: async input => {
        await mutate({
          variables: {
            objectId: session._id,
            collectionName: 'view',
            input
          }
        })

        await client.reFetchObservableQueries()
      }
    })
  }),
  withHandlers<TimesTabsProps, TimesTabsHandles>(({ setTab, modify }) => ({
    handleFlush: () => () =>
      window.confirm('Are you sure?') &&
      modify({
        $set: {
          tags: []
        }
      }),

    handleDrop: () => ({
      currentTarget: {
        dataset: { id }
      }
    }) =>
      setTab('', () =>
        modify({
          $pull: {
            tags: id
          }
        })
      ),

    handleRefresh: ({ client }) => () => client.reFetchObservableQueries()
  }))
)(
  ({
    session,
    tab,
    setTab,
    setInput,
    handleRefresh,
    handleFlush,
    handleDrop
  }) => (
    <Flex
      as="nav"
      css={`
        justify-self: flex-start;
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
            margin-right: 0.3em;

            &.refresh svg {
              stroke: ${prop('theme.brand')};
            }
          }

          &:not(:hover) .delete {
            visibility: hidden;
          }
        }
      `}>
      {(session.tags as Tag[]).map(t => (
        <span key={t._id} className={tab === t._id ? 'active' : ''}>
          <a
            href="javascript:;"
            onClick={() =>
              setTab(t._id, () =>
                setInput({
                  tags: {
                    $in: [t._id]
                  }
                })
              )
            }>
            {t.title}
          </a>

          <Delete data-id={t._id} onClick={handleDrop} />
        </span>
      ))}

      <span className={tab === '' ? 'active' : ''}>
        <a href="javascript:;" onClick={() => setTab('', () => setInput({}))}>
          Everything
        </a>

        <Delete onClick={handleFlush} />
      </span>

      <span style={{ marginLeft: 5 }}>
        <Refresh onClick={handleRefresh} />
      </span>
    </Flex>
  )
)

const Refresh = ({ size = 14, ...props }) => (
  <i className="refresh" {...props}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="square">
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
      strokeWidth="1"
      strokeLinecap="square">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <line x1="10" y1="11" x2="10" y2="17" />
      <line x1="14" y1="11" x2="14" y2="17" />
    </svg>
  </i>
)

export interface TimesTabsProps {
  tab?: string
  setTab?: (a: string, cb?: () => void) => void
  setInput: (a: any) => void
  session?: View
  client?: ApolloClient<{}>
  modify?: (a: any) => MutationFn
}

export interface TimesTabsHandles {
  handleDrop: React.MouseEventHandler<HTMLAnchorElement>
  handleFlush: React.MouseEventHandler<HTMLAnchorElement>
  handleRefresh: React.MouseEventHandler<HTMLAnchorElement>
}
