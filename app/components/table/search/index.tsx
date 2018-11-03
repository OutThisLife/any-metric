import { DataTableFilter } from '@/components/pod'
import { timer as d3t } from 'd3-timer'
import { SearchInput } from 'evergreen-ui'
import fz from 'fuzzaldrin-plus'
import { func } from 'prop-types'
import { compose, getContext, setDisplayName, withHandlers } from 'recompose'
import styled from 'styled-components'

interface TInner {
  filter: DataTableFilter
}

interface THandles {
  onRef: (ref: HTMLInputElement) => void
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default compose<THandles & TInner, {}>(
  setDisplayName('search'),
  getContext({ filter: func }),
  withHandlers<TInner, THandles>(() => {
    let el: HTMLInputElement
    let $table: Element
    let $titles: HTMLCollection

    const highlight = () => {
      const $frag = document.createDocumentFragment()
      const value = el.value.trim()

      let i = $titles.length
      while (i--) {
        const $t = $titles[i]
        const $newTitle = $t.cloneNode(true) as Element

        if (!value) {
          $newTitle.innerHTML = $t.textContent
        } else {
          $newTitle.innerHTML = fz.wrap($t.textContent, value, {
            wrap: {
              tagOpen: '<mark>',
              tagClose: '</mark>'
            }
          })
        }

        $frag.appendChild($newTitle)
        $t.parentNode.replaceChild($frag.lastElementChild, $t)
      }
    }

    return {
      onRef: () => ref => {
        if (!ref) {
          return
        }

        el = ref
        $table = ref.closest('.ReactVirtualized__Table')
        $titles = $table.getElementsByClassName('title')
      },

      handleChange: ({ filter }) => ({ target: { value } }) => {
        const t = d3t(ms => (ms > 600 ? t.stop() : highlight()))

        filter({
          action: value === '' ? 'RESET' : 'SEARCH',
          value
        })
      }
    }
  })
)(({ onRef, handleChange }) => (
  <Search
    innerRef={onRef}
    type="search"
    placeholder="Filter data"
    onChange={handleChange}
  />
))

const Search = styled(SearchInput)`
  &:not(:focus) {
    box-shadow: none;
  }
`
