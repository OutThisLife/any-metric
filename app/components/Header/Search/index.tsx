import * as Form from '@/components/Form'
import Text from '@/components/Text'
import { CREATE_TAG, SEARCH_EBAY } from '@/lib/queries'
import { EbayItem } from '@/server/schema/types'
import { graphql } from 'react-apollo'
import { IoIosSearch } from 'react-icons/io'
import { Box } from 'rebass'
import { compose, setDisplayName, withState } from 'recompose'

import Loader from './Loader'
import Result from './Result'
import Search from './style'

export default compose<SearchState & SearchHandlers, {}>(
  setDisplayName('header-search'),
  withState('isOpen', 'toggle', false),
  withState('items', 'setItems', []),
  graphql<SearchState, {}, {}, SearchHandlers>(SEARCH_EBAY, {
    options: {
      ssr: false,
      variables: {
        save: false,
        keywords: 'fancy dress',
        paginationInput: {
          pageNumber: 1,
          entriesPerPage: 1
        }
      }
    },
    props: ({ data: { fetchMore }, ownProps: { toggle, setItems } }) => {
      const collect = async (variables, updateQuery: any = () => null) =>
        await fetchMore({
          updateQuery,
          variables: {
            ...variables,
            save: true
          }
        })

      if ('browser' in process && !('collect' in window)) {
        ;(window as any).collect = collect
      }

      return {
        handleSubmit: async ({ target }) => {
          const el = target as HTMLElement
          el.classList.add('loading')

          toggle(true)
          setItems([])

          collect(
            {
              keywords: (document.getElementById('s') as HTMLInputElement)
                .value,
              paginationInput: {
                pageNumber: 1,
                entriesPerPage: 4
              }
            },
            (_, { fetchMoreResult }) => {
              el.classList.remove('loading')

              if (fetchMoreResult) {
                window.requestAnimationFrame(() =>
                  setItems(fetchMoreResult.ebay.items)
                )
              }
            }
          )
        },

        handleReset: ({ target }) => {
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
        }
      }
    }
  }),
  graphql<SearchState, {}, {}, SearchHandlers>(CREATE_TAG, {
    props: ({ mutate }) => ({
      handleConfirm: () => {
        const el = document.getElementById('s') as HTMLInputElement
        const { value: title } = el

        if (!title.length) {
          return
        }

        window.requestAnimationFrame(() =>
          mutate({
            update: () => el.closest('form').reset(),
            refetchQueries: ['getTags'],
            variables: {
              input: {
                title,
                isQuery: true
              }
            }
          })
        )
      }
    })
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
}

export interface SearchHandlers {
  handleSubmit?: React.KeyboardEventHandler<HTMLFormElement>
  handleReset?: React.MouseEventHandler<HTMLButtonElement>
  handleConfirm?: React.MouseEventHandler<HTMLButtonElement>
}
