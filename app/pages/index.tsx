import { GET_VIEW } from '@/lib/queries'
import { View } from '@/server/schema/types'
import { DataValue, graphql } from 'react-apollo'
import { Flex } from 'rebass'
import { compose, setDisplayName } from 'recompose'

export default compose<HomeProps & HomeHandles, {}>(
  setDisplayName('login'),
  graphql<HomeProps & HomeHandles, { slug: string }>(GET_VIEW, {
    options: {
      variables: {
        input: {
          slug: 'guest'
        }
      }
    },
    props: ({ data }) => ({
      data,
      handleSubmit: async () => {
        const slug = (document.getElementById('v') as HTMLInputElement).value

        const {
          data: { view }
        } = await data.fetchMore({
          variables: { input: { slug } },
          updateQuery: (_, { fetchMoreResult }) => fetchMoreResult
        })

        if ('_id' in view) {
          window.requestAnimationFrame(() => (location.pathname = view._id))
        } else {
          alert('Something went wrong. /shrug')
        }
      }
    })
  })
)(({ handleSubmit }) => (
  <Flex
    as="main"
    justifyContent="center"
    alignItems="center"
    css={`
      width: 100vw;
      height: 100vh;

      input {
        text-align: center;
      }
    `}>
    <form method="post" action="javascript:;" onSubmit={handleSubmit}>
      <input
        required
        id="v"
        name="v"
        placeholder="view id"
        spellCheck={false}
        autoComplete="off"
      />
    </form>
  </Flex>
))

export interface HomeProps {
  data: DataValue<{ view: View }, { slug: string }>
}

export interface HomeHandles {
  handleSubmit: React.FormEventHandler<HTMLFormElement>
}
