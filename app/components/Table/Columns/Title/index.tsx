import Text from '@/components/Text'
import { getWatchlist, SET_WATCHLIST } from '@/lib/queries'
import { Product } from '@/server/schema/types'
import { graphql } from 'react-apollo'
import { IoMdStar, IoMdStarOutline } from 'react-icons/io'
import { compose, setDisplayName, withProps } from 'recompose'

import { ColumnProps } from '..'
import Title from './style'

export default compose<TitleProps & TitleState, TitleProps>(
  setDisplayName('col-title'),
  getWatchlist(),
  withProps(({ item, watchlist }) => ({
    isFav: watchlist.some(t => t._id === item._id)
  })),
  graphql<TitleState & TitleProps, {}, {}, TitleState>(SET_WATCHLIST, {
    props: ({ mutate, ownProps: { item, watchlist } }) => ({
      handleClick: async e => {
        e.preventDefault()

        const idx = watchlist.findIndex(t => t._id === item._id)

        if (idx === -1) {
          watchlist.push(item)
        } else {
          watchlist.splice(idx, 1)
        }

        await mutate({
          refetchQueries: ['getWatchlist'],
          variables: { watchlist }
        })

        const $watchlist = document.getElementById('watchlist')

        if ($watchlist instanceof HTMLElement) {
          $watchlist.classList.add('flash')
          $watchlist.addEventListener(
            'transitionend',
            () => $watchlist.classList.remove('flash'),
            { once: true }
          )
        }
      }
    })
  })
)(({ isFav, handleClick, item }) => (
  <Title name="title" p={0}>
    <Text
      as="a"
      tabIndex={-1}
      href={item.url}
      target="_blank"
      rel="noopener"
      className="title">
      <span className="favourite" onClick={handleClick}>
        {isFav ? <IoMdStar className="hl" /> : <IoMdStarOutline />}
      </span>

      <span dangerouslySetInnerHTML={{ __html: item.title }} />
    </Text>
  </Title>
))

interface TitleProps extends ColumnProps {
  item?: Product
  watchlist?: Product[]
}

interface TitleState {
  isFav?: boolean
  handleClick?: React.MouseEventHandler<any>
}
