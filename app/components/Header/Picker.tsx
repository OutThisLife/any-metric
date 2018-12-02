import { createTheme } from '@/theme'
import * as d3 from 'd3'
import gql from 'graphql-tag'
import { graphql, MutateProps } from 'react-apollo'
import { CirclePicker } from 'react-color'
import { compose, setDisplayName } from 'recompose'

let tm: d3.Timer | {} = {}

export default compose<MutateProps, {}>(
  setDisplayName('theme-picker'),
  graphql(
    gql`
      mutation setTheme($theme: String!) {
        setTheme(theme: $theme) {
          value
        }
      }
    `,
    {
      options: {
        refetchQueries: [
          {
            query: gql`
              {
                theme {
                  value
                }
              }
            `
          }
        ]
      }
    }
  )
)(({ mutate }) => (
  <CirclePicker
    circleSize={6}
    circleSpacing={6}
    onChange={c => {
      const theme = JSON.stringify(createTheme(['#fafafa', '#0A0F14', c.hex]))

      if ('stop' in tm) {
        tm.stop()
      }

      tm = d3.timeout(
        () =>
          mutate({
            variables: { theme },
            optimisticResponse: {
              __typename: 'Mutation',
              setTheme: {
                __typename: 'Theme',
                value: theme
              }
            }
          }),
        15
      )
    }}
  />
))
