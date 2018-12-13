import * as Form from '@/components/Form'
import Text from '@/components/Text'
import { CREATE_TAG, SEARCH_EBAY } from '@/lib/queries'
import { EbayItem } from '@/server/schema/types'
import { graphql, GraphqlQueryControls } from 'react-apollo'
import { IoIosSearch } from 'react-icons/io'
import { Box } from 'rebass'
import {
  compose,
  setDisplayName,
  StateHandler,
  StateHandlerMap,
  withHandlers,
  withStateHandlers
} from 'recompose'

import Loader from './Loader'
import Result from './Result'
import Search from './style'

export default compose<SearchState & SearchStateHandlers & SearchHandlers, {}>(
  setDisplayName('header-search'),
  graphql<{}, {}, {}, SearchHandlers>(CREATE_TAG, {
    options: {
      awaitRefetchQueries: true
    }
  }),
  graphql(SEARCH_EBAY, {
    options: {
      ssr: false,
      variables: {
        keywords: 'adidas',
        paginationInput: {
          pageNumber: 1,
          entriesPerPage: 1
        }
      }
    },
    props: ({ data: { fetchMore } }) => ({ fetchMore })
  }),
  withStateHandlers<SearchState, SearchStateHandlers>(
    {
      isOpen: false,
      items: []
    },
    {
      toggle: () => isOpen => ({ isOpen }),
      setItems: () => items => ({ items })
    }
  ),
  withHandlers<SearchState & SearchStateHandlers, SearchHandlers>(() => ({
    handleSubmit: ({ fetchMore, toggle, setItems }) => async ({ target }) => {
      const el = target as HTMLElement
      el.classList.add('loading')

      toggle(true)
      setItems([])

      await fetchMore({
        variables: {
          keywords: (document.getElementById('s') as HTMLInputElement).value,
          paginationInput: {
            pageNumber: 1,
            entriesPerPage: 4
          }
        },
        updateQuery: (_, { fetchMoreResult }) => {
          el.classList.remove('loading')

          if (fetchMoreResult) {
            setItems(fetchMoreResult.ebay.items)
          }
        }
      })
    },

    handleReset: ({ setItems, toggle }) => ({ target }) => {
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

    handleConfirm: ({ mutate }) => () => {
      const el = document.getElementById('s') as HTMLInputElement
      const { value: title } = el

      if (title.length) {
        window.requestAnimationFrame(() =>
          mutate({
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

      el.closest('form').reset()
    }
  }))
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
  fetchMore?: GraphqlQueryControls['fetchMore']
}

export interface SearchStateHandlers extends StateHandlerMap<SearchState> {
  setItems?: StateHandler<SearchState>
  toggle?: StateHandler<SearchState>
}

export interface SearchHandlers {
  handleSubmit?: React.KeyboardEventHandler<HTMLFormElement>
  handleReset?: React.MouseEventHandler<HTMLButtonElement>
  handleConfirm?: React.MouseEventHandler<HTMLButtonElement>
}
