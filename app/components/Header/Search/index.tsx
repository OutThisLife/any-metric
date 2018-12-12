import * as Form from '@/components/Form'
import Text from '@/components/Text'
import { CREATE_TAG, GET_TAGS, SEARCH_EBAY } from '@/lib/queries'
import { EbayItem, EbayResult, Tag } from '@/server/schema/types'
import { ApolloClient } from 'apollo-boost'
import { withApollo } from 'react-apollo'
import { IoIosSearch } from 'react-icons/io'
import { Box, BoxProps } from 'rebass'
import { compose, setDisplayName, withHandlers, withState } from 'recompose'

import Result from './Result'
import Search from './style'

export default compose<SearchState & SearchHandlers, BoxProps>(
  setDisplayName('header-search'),
  withState('items', 'setItems', []),
  withApollo,
  withHandlers<SearchState, SearchHandlers>(() => ({
    handleSubmit: ({ client, setItems }) => async ({ target }) => {
      const el = target as HTMLElement
      const keywords = (document.getElementById('s') as HTMLInputElement).value

      el.classList.add('loading')

      const { data } = await client.query<{ ebay: EbayResult }>({
        query: SEARCH_EBAY,
        variables: {
          keywords,
          paginationInput: {
            pageNumber: 1,
            entriesPerPage: 4
          }
        }
      })

      setItems(data.ebay.items, () => el.classList.remove('loading'))
    },

    handleReset: ({ setItems }) => ({ target }) => {
      const el = (target as HTMLElement).querySelector('section')

      if (el instanceof HTMLElement) {
        el.addEventListener('animationend', () => setItems([]), { once: true })
        el.classList.add('anim-out')
      }
    },

    handleConfirm: ({ client }) => async () => {
      const el = document.getElementById('s') as HTMLInputElement

      if (el.value.length) {
        await client.mutate<{ tags: Tag[] }>({
          mutation: CREATE_TAG,
          refetchQueries: [{ query: GET_TAGS }],
          variables: {
            input: {
              title: el.value,
              isQuery: true
            }
          }
        })
      }

      el.closest('form').reset()
    }
  }))
)(({ items, handleSubmit, handleReset, handleConfirm }) => (
  <Search onSubmit={handleSubmit} onReset={handleReset}>
    <Form.Input
      required
      id="s"
      tabIndex={-1}
      isFocused={items.length > 0}
      placeholder="Add a product"
      icon={IoIosSearch}
    />

    {items.length ? (
      <Box as="section">
        <Box>
          <Text as="h5" m={0}>
            Please verify that these initial results represent the data you want
            to pull &mdash;
          </Text>

          <Box
            as="nav"
            css={`
              display: grid;
              grid-template-columns: repeat(2, 1fr);
              grid-gap: calc(var(--pad) * 2);
              padding: var(--offset);
            `}>
            {items.map((d, i) => (
              <Result key={`${i}-${d._id}`} {...d} />
            ))}
          </Box>

          <Form.Button type="button" onClick={handleConfirm}>
            Looks good, add to list
          </Form.Button>

          <Form.Button type="reset" variant="noborder">
            Cancel
          </Form.Button>
        </Box>
      </Box>
    ) : null}
  </Search>
))

export interface SearchState {
  items: EbayItem[]
  setItems: (i: EbayItem[], cb?: () => void) => void
  client?: ApolloClient<{}>
}

export interface SearchHandlers {
  handleSubmit: React.KeyboardEventHandler<HTMLFormElement>
  handleReset: React.MouseEventHandler<HTMLButtonElement>
  handleConfirm: React.MouseEventHandler<HTMLButtonElement>
}
