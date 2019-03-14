import { MODIFY_DOC, SEARCH_EBAY_BARE } from '@/lib/queries'
import { Tag, View } from '@/server/schema/types'
import { ApolloClient } from 'apollo-boost'
import { print } from 'graphql'
import { func, object } from 'prop-types'
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

import ImportWorker from '../Search/save.worker.js'

export default compose<TimesTabsProps & TimesTabsHandles, {}>(
  setDisplayName('chart-times-tabs'),
  withApollo,
  getContext({ session: object, setInput: func }),
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
  withStateHandlers(
    { tab: '', loading: '' },
    {
      setTab: () => (tab, cb = () => null) => {
        if (tab.length) {
          location.hash = `/${tab}`
        } else {
          window.history.replaceState(null, null, location.pathname)
        }

        cb()
        return { tab }
      },

      setLoading: () => (loading, cb = () => null) => {
        cb()
        return { loading }
      }
    }
  ),
  withHandlers<TimesTabsProps, TimesTabsHandles>(
    ({ setTab, setInput, modify }) => ({
      onRef: () => ref => {
        if (!ref) {
          return
        } else if (location.hash) {
          const id = location.hash.split('/')[1]
          const $a = document.getElementById(`tab-${id}`)

          if ($a instanceof HTMLAnchorElement) {
            $a.click()
          }
        }
      },

      handleClick: () => (tab, params = {}) =>
        setTab(tab, () => setInput(params)),

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
        window.confirm('Are you sure?') &&
        setTab('', () =>
          modify({
            $pull: {
              tags: id
            }
          })
        ),

      handleRefresh: ({ setLoading }) => ({
        currentTarget: {
          dataset: { keywords }
        }
      }) => {
        const $status = document.getElementById('status')
        const worker = new ImportWorker()

        let n = 0
        worker.addEventListener('message', async ({ data: e }) => {
          try {
            if (e.err) {
              throw e.err
            }

            if (e.total) {
              $status.firstElementChild.innerHTML = `${(n += e.total)} / ${
                e.totalEntries
              } &hellip;`
            }

            if (e.done) {
              setLoading('', () => {
                $status.lastElementChild.textContent = 'OK'
                document.body.removeAttribute('data-proc')
              })

              worker.terminate()
            }
          } catch (err) {
            worker.terminate()
          }
        })

        setLoading(keywords, () =>
          worker.postMessage({
            recurse: true,
            query: print(SEARCH_EBAY_BARE),
            variables: {
              keywords,
              operation: 'findCompletedItems',
              save: true,
              paginationInput: { pageNumber: 1, entriesPerPage: 100 },
              itemFilter: [
                {
                  name: 'HideDuplicateItems',
                  value: true
                },
                {
                  name: 'SoldItemsOnly',
                  value: true
                }
              ]
            }
          })
        )
      }
    })
  )
)(
  ({
    onRef,
    session,
    tab,
    loading,
    handleClick,
    handleRefresh,
    handleFlush,
    handleDrop
  }) => (
    <Flex
      ref={onRef}
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
          padding: 5px;
          background: rgba(0, 0, 0, 0.02);

          + span {
            margin-left: 1em;
          }

          &.loading {
            opacity: 0.3;
            pointer-events: none;
          }

          &.active {
            color: ${prop('theme.bg')};
            background: ${prop('theme.brand')};
          }

          span {
            display: inline-flex;
            align-items: center;
            padding: 0 0 0 3px;
            margin: 0 0 0 5px;
            border-left: 1px solid rgba(255, 255, 255, 0.3);

            i {
              cursor: pointer;
              display: inline-flex;

              + i {
                margin-left: 0.2em;
              }
            }
          }

          &:not(:hover) span {
            opacity: 0.2;
          }

          a {
            color: inherit;
            line-height: 1;
          }
        }
      `}>
      {(session.tags as Tag[]).map(t => (
        <span
          key={t._id}
          className={`${tab === t._id ? 'active' : ''} ${
            loading === t.slug ? 'loading' : ''
          }`}>
          <a
            id={`tab-${t._id}`}
            href="javascript:;"
            onClick={() =>
              handleClick(t._id, {
                tags: {
                  $in: [t._id]
                }
              })
            }>
            {t.title}
          </a>

          <span>
            <Refresh data-keywords={t.slug} onClick={handleRefresh} />
            <Delete data-id={t._id} onClick={handleDrop} />
          </span>
        </span>
      ))}

      <span className={tab === '' ? 'active' : ''}>
        <a href="javascript:;" onClick={() => handleClick('')}>
          Everything
        </a>

        <span>
          <Delete onClick={handleFlush} />
        </span>
      </span>
    </Flex>
  )
)

const Delete = ({ size = 12, ...props }) => (
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

const Refresh = ({ size = 12, ...props }) => (
  <i className="refresh" {...props}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="3"
      viewBox="0 0 24 24">
      <path d="M21.2 15c.7-1.2 1-2.5.7-3.9-.6-2-2.4-3.5-4.4-3.5h-1.2c-.7-3-3.2-5.2-6.2-5.6-3-.3-5.9 1.3-7.3 4-1.2 2.5-1 6.5.5 8.8m8.7 5V12m4 5l-4 4-4-4" />
    </svg>
  </i>
)

export interface TimesTabsProps {
  tab?: string
  setTab?: (a: string, cb?: () => void) => void
  loading?: string
  setLoading?: (a: string, cb?: () => void) => void
  setInput: (a: any) => void
  session?: View
  client?: ApolloClient<{}>
  modify?: (a: any) => MutationFn
}

export interface TimesTabsHandles {
  onRef?: (ref: HTMLElement) => void
  handleClick: (tab: string, params?: any) => void
  handleDrop: React.MouseEventHandler<HTMLAnchorElement>
  handleFlush: React.MouseEventHandler<HTMLAnchorElement>
  handleRefresh: React.MouseEventHandler<HTMLAnchorElement>
}
