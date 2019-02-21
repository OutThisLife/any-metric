import { SEARCH_EBAY, SEARCH_EBAY_BARE } from '@/lib/queries'
import { moneyFormat } from '@/lib/utils'
import { EbayItem, Tag } from '@/server/schema/types'
import { ApolloClient } from 'apollo-boost'
import { print } from 'graphql/language/printer'
import { withApollo } from 'react-apollo'
import { AtomSpinner } from 'react-epic-spinners'
import { Box } from 'rebass'
import { compose, setDisplayName, withHandlers, withState } from 'recompose'
import { prop } from 'styled-tools'

import ImportWorker from './save.worker.js'

export default compose<SearchState & SearchHandlers, {}>(
  setDisplayName('header-search'),
  withApollo,
  withState('isOpen', 'toggleModal', false),
  withState('items', 'setItems', []),
  withHandlers<SearchState, SearchHandlers>(({ toggleModal, setItems }) => ({
    handleSubmit: () => async () => {
      const el = document.getElementById('s') as HTMLInputElement
      const $form = el.closest('form') as HTMLFormElement

      $form.classList.add('loading')

      const worker = new ImportWorker()
      worker.addEventListener('message', ({ data: e }) => {
        try {
          if (e.err) {
            throw e.err
          } else if (e.ebay.items.length) {
            setItems(e.ebay.items, () => $form.classList.remove('loading'))
          }

          if (e.done) {
            worker.terminate()
          }
        } catch (err) {
          $form.reset()
        }
      })

      toggleModal(true, () =>
        setItems([], () =>
          worker.postMessage({
            query: print(SEARCH_EBAY),
            variables: {
              keywords: el.value,
              save: false,
              paginationInput: { entriesPerPage: 2 }
            }
          })
        )
      )
    },

    handleConfirm: ({ client }) => () => {
      const el = document.getElementById('s') as HTMLInputElement
      const $form = el.closest('form') as HTMLFormElement

      $form.classList.add('loading')

      const worker = new ImportWorker()
      worker.addEventListener('message', async ({ data: e }) => {
        try {
          if (e.err) {
            throw e.err
          } else if ($form.classList.contains('loading')) {
            toggleModal(false, () => $form.classList.remove('loading'))
          }

          client.reFetchObservableQueries()

          if (e.done) {
            worker.terminate()
          }
        } catch (err) {
          $form.reset()
        }
      })

      setItems([], () =>
        worker.postMessage({
          recurse: true,
          query: print(SEARCH_EBAY_BARE),
          variables: {
            keywords: el.value,
            save: true,
            paginationInput: { entriesPerPage: 100 }
          }
        })
      )
    },

    handleReset: () => () => setItems([], () => toggleModal(false))
  }))
)(({ isOpen, handleSubmit, handleReset, handleConfirm, items = [] }) => (
  <Box
    as="form"
    method="post"
    action="javascript:;"
    onSubmit={handleSubmit}
    onReset={handleReset}
    css={`
      z-index: 100;
      position: relative;
      display: block;
      width: 100%;
      margin: 0;
      padding: 0;

      &.loading {
        input,
        button {
          opacity: 0.5;
          pointer-events: none;
        }
      }

      > section {
        z-index: 100;
        position: fixed;
        top: calc(var(--pad) + 26px);
        left: var(--pad);
        padding: var(--pad) 0;

        @media (min-width: 1025px) {
          width: calc(50vw - var(--pad));
        }

        @media (max-width: 1025px) {
          right: var(--pad);
          border: 1px solid ${prop('theme.border')};
          background: ${prop('theme.bg')};
        }

        nav {
          margin: 10px auto;
          padding: var(--pad);
          border: 1px solid ${prop('theme.border')};
          background: ${prop('theme.panel')};
        }

        nav > div {
          display: flex;
          align-items: center;

          + div {
            margin-top: 1px;

            @media (max-width: 1025px) {
              margin-top: calc(var(--pad) / 2);
            }
          }

          figure {
            width: 40px;
            height: 40px;
            margin: auto;

            img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }

            &:hover + aside > a {
              color: ${prop('theme.base')};
            }
          }

          aside {
            display: flex;
            justify-content: space-between;
            flex: 1;
            padding-left: 1em;
          }
        }
      }
    `}>
    <input
      required
      id="s"
      name="s"
      placeholder="Add a product"
      autoComplete="off"
      spellCheck={false}
    />

    {isOpen && (
      <Box as="section">
        <h5>
          Please verify that these initial results represent the data you want
          to pull &mdash;
        </h5>
        <nav>
          {items.length ? (
            items.map((item, i) => (
              <div key={i + item._id}>
                {'galleryURL' in item && (
                  <figure>
                    <a href={item.viewItemURL} target="_blank" rel="noopener">
                      <img src={item.galleryURL} alt={item.title} />
                    </a>
                  </figure>
                )}

                <aside>
                  <a
                    href={item.viewItemURL}
                    target="_blank"
                    rel="noopener"
                    dangerouslySetInnerHTML={{ __html: item.title }}
                  />

                  {'currentPrice' in item.sellingStatus && (
                    <p>
                      {moneyFormat(
                        item.sellingStatus.currentPrice[0].__value__
                      )}
                    </p>
                  )}
                </aside>
              </div>
            ))
          ) : (
            <AtomSpinner
              className="spinner"
              size={120}
              color="#ddd"
              animationDuration={1337}
              style={{ gridColumn: '1 / -1', margin: 'auto' }}
            />
          )}
        </nav>
        <button type="button" onClick={handleConfirm}>
          Looks good, watch this query
        </button>
        &nbsp;
        <button type="reset">Cancel</button>
      </Box>
    )}
  </Box>
))

export interface SearchState {
  items: EbayItem[]
  tags?: Tag[]
  isOpen: boolean
  isForm: boolean
  client?: ApolloClient<{}>
  setItems?: (r: EbayItem[] | string[], cb?: () => void) => void
  toggleModal?: (b: boolean, cb?: () => void) => void
  toggleForm?: (b: boolean, cb?: () => void) => void
}

export interface SearchHandlers {
  handleSubmit?: React.FormEventHandler<HTMLFormElement>
  handleReset?: React.FormEventHandler<HTMLElement>
  handleConfirm?: React.FormEventHandler<HTMLElement>
}
