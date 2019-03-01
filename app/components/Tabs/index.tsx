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
  withStateHandlers
} from 'recompose'
import { prop } from 'styled-tools'

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
    { tab: '' },
    {
      setTab: () => (tab, cb = () => null) => {
        if (tab.length) {
          location.hash = `/${tab}`
        } else {
          window.history.replaceState(null, null, location.pathname)
        }

        cb()
        return { tab }
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

      handleClick: () => (tab, params = {}) => {
        setTab(tab, () => setInput(params))
      },

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
        )
    })
  )
)(({ onRef, session, tab, handleClick, handleFlush, handleDrop }) => (
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

        i {
          cursor: pointer;
          margin: 0 0.3em 0 0.1em;

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

        <Delete data-id={t._id} onClick={handleDrop} />
      </span>
    ))}

    <span className={tab === '' ? 'active' : ''}>
      <a href="javascript:;" onClick={() => handleClick('')}>
        Everything
      </a>

      <Delete onClick={handleFlush} />
    </span>
  </Flex>
))

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

export interface TimesTabsProps {
  tab?: string
  setTab?: (a: string, cb?: () => void) => void
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
}
