import * as Form from '@/components/Form'
import { SEARCH_EBAY } from '@/lib/queries'
import { EbayItem, EbayResult } from '@/server/schema/types'
import { ApolloClient } from 'apollo-boost'
import { withApollo } from 'react-apollo'
import { IoIosSearch } from 'react-icons/io'
import { BoxProps } from 'rebass'
import { compose, setDisplayName, withHandlers, withState } from 'recompose'

export default compose<SearchState & SearchHandlers, BoxProps>(
  setDisplayName('header-search'),
  withApollo,
  withState('items', 'setItems', []),
  withHandlers<SearchState, SearchHandlers>(() => ({
    handleSubmit: ({ client, setItems }) => async ({ target }) => {
      const el = target as HTMLElement

      el.classList.add('loading')

      const keywords = el.querySelector('input').value
      const { data } = await client.query<{ ebay: EbayResult }>({
        query: SEARCH_EBAY,
        variables: { keywords }
      })

      el.classList.remove('loading')
      console.log(data.ebay)

      setItems(data.ebay.items)
    }
  }))
)(({ items, handleSubmit }) => (
  <Form.Container onSubmit={handleSubmit}>
    <Form.Input
      required
      tabIndex={-1}
      placeholder="Add a product"
      icon={IoIosSearch}
    />

    {items.length && (
      <section>
        <ul>
          {items.map(i => (
            <li>{i._id}</li>
          ))}
        </ul>
      </section>
    )}
  </Form.Container>
))

export interface SearchState {
  items: EbayItem[]
  setItems: (i: EbayItem[]) => void
  client?: ApolloClient<{}>
}

export interface SearchHandlers {
  handleSubmit: React.KeyboardEventHandler<HTMLFormElement>
}
