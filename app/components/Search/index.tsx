import { SEARCH_EBAY, SEARCH_EBAY_BARE } from '@/lib/queries'
import { moneyFormat } from '@/lib/utils'
import { EbayItem, EbayResult, Tag } from '@/server/schema/types'
import { ApolloClient } from 'apollo-boost'
import { withApollo } from 'react-apollo'
import { AtomSpinner } from 'react-epic-spinners'
import { Box } from 'rebass'
import { compose, setDisplayName, withHandlers, withState } from 'recompose'

import Search from './style'

export default compose<SearchState & SearchHandlers, {}>(
  setDisplayName('header-search'),
  withApollo,
  withState('isOpen', 'toggleModal', false),
  withState('items', 'setItems', []),
  withHandlers<SearchState, SearchHandlers>(
    ({ toggleModal, setItems, client }) => ({
      handleSubmit: () => async () => {
        const el = document.getElementById('s') as HTMLInputElement
        const { value: keywords } = el

        toggleModal(true)
        setItems([])

        try {
          const {
            data: { ebay }
          } = await client.query<{ ebay: EbayResult }>({
            query: SEARCH_EBAY,
            variables: {
              keywords,
              paginationInput: {
                pageNumber: 1,
                entriesPerPage: 2
              }
            }
          })

          if (ebay.items.length) {
            window.requestAnimationFrame(() => setItems(ebay.items))
          } else {
            toggleModal(false)
          }
        } catch (err) {
          el.closest('form').reset()
        }
      },

      handleReset: () => () => {
        toggleModal(false)
        setItems([])
      },

      handleConfirm: () => async () => {
        const el = document.getElementById('s') as HTMLInputElement
        const { value: keywords } = el
        const $form = el.closest('form') as HTMLFormElement

        if (!keywords.length) {
          return
        }

        try {
          const {
            data: { ebay }
          } = await client.query<{ ebay: EbayResult }>({
            query: SEARCH_EBAY,
            variables: {
              keywords,
              save: true,
              paginationInput: {
                pageNumber: 1,
                entriesPerPage: 100
              }
            }
          })

          await client.reFetchObservableQueries()
          $form.reset()

          for (
            let i = 1, l = parseInt(ebay.totalPages as string, 10);
            i < l;
            i++
          ) {
            try {
              await client.query<{}>({
                query: SEARCH_EBAY_BARE,
                variables: {
                  keywords,
                  paginationInput: {
                    pageNumber: i,
                    entriesPerPage: 100
                  }
                }
              })

              await client.reFetchObservableQueries()
            } catch (err) {
              console.error(err)
              break
            }
          }
        } catch (err) {
          console.error(err)
        } finally {
          await client.reFetchObservableQueries()
          $form.reset()
        }
      }
    })
  )
)(({ isOpen, handleSubmit, handleReset, handleConfirm, items = [] }) => (
  <Search
    method="post"
    action="javascript:;"
    onSubmit={handleSubmit}
    onReset={handleReset}>
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
  </Search>
))

export interface SearchState {
  items: EbayItem[]
  client?: ApolloClient<{}>
  tags?: Tag[]
  isOpen: boolean
  isForm: boolean
  setItems?: (r: EbayItem[] | string[]) => void
  toggleModal?: (b: boolean, cb?: () => void) => void
  toggleForm?: (b: boolean, cb?: () => void) => void
}

export interface SearchHandlers {
  handleSubmit?: React.FormEventHandler<HTMLFormElement>
  handleReset?: React.FormEventHandler<HTMLElement>
  handleConfirm?: React.FormEventHandler<HTMLElement>
}
