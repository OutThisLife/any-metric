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
        setTheme(theme: $theme) @client
      }
    `
  )
)(({ mutate }) => (
  <CirclePicker
    circleSize={6}
    circleSpacing={6}
    onChange={c => {
      if ('stop' in tm) {
        tm.stop()
      }

      tm = d3.timeout(
        () =>
          mutate({
            variables: {
              theme: JSON.stringify(createTheme(['#fafafa', '#0A0F14', c.hex]))
            }
          }),
        15
      )
    }}
  />
))
