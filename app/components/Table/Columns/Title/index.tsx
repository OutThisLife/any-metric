import Text from '@/components/Text'
import { getWatchlist, SET_WATCHLIST } from '@/lib/queries'
import { Product } from '@/server/schema/types'
import { graphql } from 'react-apollo'
import { IoMdStar, IoMdStarOutline } from 'react-icons/io'
import { compose, setDisplayName, withState } from 'recompose'

import { ColumnProps } from '..'
import Title from './style'

export default compose<TitleProps & TitleState, TitleProps>(
  setDisplayName('col-title'),
  getWatchlist(),
  withState('isFav', 'toggleFav', ({ item, watchlist = [] }) =>
    watchlist.some(i => i._id === item._id)
  ),
  graphql<TitleState & TitleProps, {}, {}, TitleState>(SET_WATCHLIST, {
    options: {
      awaitRefetchQueries: true
    },
    props: ({ mutate, ownProps: { item, watchlist, isFav, toggleFav } }) => ({
      handleClick: e => {
        e.preventDefault()
        toggleFav(!isFav, async () => {
          if (!isFav) {
            watchlist.push(item)
          } else {
            watchlist.splice(watchlist.findIndex(t => t._id === item._id), 1)
          }

          const res = await mutate({
            refetchQueries: ['getWatchlist'],
            variables: { watchlist }
          })

          console.log(res)
        })
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
      {isFav ? (
        <IoMdStar onClick={handleClick} className="favourite hl fill" />
      ) : (
        <IoMdStarOutline onClick={handleClick} className="favourite" />
      )}
      {item.title}
    </Text>
  </Title>
))

interface TitleProps extends ColumnProps {
  item?: Product
  watchlist?: Product[]
}

interface TitleState {
  isFav?: boolean
  toggleFav?: (b: boolean, cb?: () => any) => void
  handleClick?: React.MouseEventHandler<any>
}
