import * as Form from '@/components/Form'
import Text from '@/components/Text'
import { MODIFY_DOC, SEARCH_EBAY } from '@/lib/queries'
import { EbayItem, EbayResult } from '@/server/schema/types'
import { ApolloClient } from 'apollo-boost'
import { withApollo } from 'react-apollo'
import { IoIosSearch } from 'react-icons/io'
import { Box } from 'rebass'
import { compose, setDisplayName, withHandlers, withState } from 'recompose'

import Loader from './Loader'
import Result from './Result'
import Search from './style'

export default compose<SearchState & SearchHandlers, {}>(
  setDisplayName('header-search'),
  withState('isOpen', 'toggle', false),
  withState('items', 'setItems', []),
  withApollo,
  withHandlers<SearchState, SearchHandlers>(({ toggle, setItems, client }) => {
    const collect = async (
      variables,
      cb: (a: EbayResult) => void = () => null
    ) => {
      const res = await client.query<{ ebay: EbayResult }>({
        query: SEARCH_EBAY,
        variables
      })

      cb(res.data.ebay)

      if (variables.save && res.data.ebay.items.length) {
        await client.mutate({
          mutation: MODIFY_DOC,
          refetchQueries: ['getTags', 'getProducts'],
          variables: {
            objectId: res.data.ebay.items[0]._id,
            collectionName: 'products',
            input: JSON.parse(
              JSON.stringify({
                $set: {
                  updatedAt: new Date()
                }
              })
            )
          }
        })
      }
    }

    if ('browser' in process && !('collect' in window)) {
      ;(window as any).collect = collect
    }

    return {
      handleSubmit: () => async ({ target }) => {
        const el = target as HTMLElement
        el.classList.add('loading')

        toggle(true)
        setItems([])

        collect(
          {
            keywords: (document.getElementById('s') as HTMLInputElement).value,
            paginationInput: {
              pageNumber: 1,
              entriesPerPage: 4
            }
          },
          ({ items = [] }) => {
            el.classList.remove('loading')

            if (items.length) {
              window.requestAnimationFrame(() => setItems(items))
            }
          }
        )
      },

      handleReset: () => ({ target }) => {
        const el = (target as HTMLElement).querySelector('section')

        el.addEventListener(
          'animationend',
          () => {
            toggle(false)
            setItems([])
          },
          { once: true }
        )

        el.classList.add('anim-out')
      },

      handleConfirm: () => () => {
        const el = document.getElementById('s') as HTMLInputElement
        const { value: title } = el
        const $form = el.closest('form') as HTMLFormElement

        $form.classList.add('loading')

        if (!title.length) {
          $form.classList.remove('loading')
          return
        }

        ;(window as any).collect(
          {
            keywords: title,
            save: true,
            paginationInput: {
              pageNumber: 1,
              entriesPerPage: 100
            }
          },
          () => {
            $form.reset()
            $form.classList.remove('loading')
          }
        )
      }
    }
  })
)(({ isOpen, items, handleSubmit, handleReset, handleConfirm }) => (
  <Search onSubmit={handleSubmit} onReset={handleReset}>
    <Form.Input
      required
      id="s"
      tabIndex={-1}
      isFocused={isOpen}
      placeholder="Add a product"
      icon={IoIosSearch}
    />

    {isOpen && (
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
            {items.length ? (
              items.map((item, i) => <Result key={i + item._id} {...item} />)
            ) : (
              <Loader />
            )}
          </Box>

          <Form.Button type="button" onClick={handleConfirm}>
            Looks good, add to list
          </Form.Button>

          <Form.Button type="reset" variant="noborder">
            Cancel
          </Form.Button>
        </Box>
      </Box>
    )}
  </Search>
))

export interface SearchState {
  items: EbayItem[]
  isOpen: boolean
  setItems?: (r: EbayItem[]) => void
  toggle?: (b: boolean) => void
  client?: ApolloClient<{}>
}

export interface SearchHandlers {
  handleSubmit?: React.KeyboardEventHandler<HTMLFormElement>
  handleReset?: React.MouseEventHandler<HTMLButtonElement>
  handleConfirm?: React.MouseEventHandler<HTMLButtonElement>
}
