import { createTheme } from '@/theme'
import * as d3 from 'd3'
import gql from 'graphql-tag'
import { graphql, MutateProps } from 'react-apollo'
import { CirclePicker } from 'react-color'
import { compose, setDisplayName } from 'recompose'

let tm = d3.timeout(() => null)

export default compose<MutateProps, {}>(
  setDisplayName('theme-picker'),
  graphql(
    gql`
      mutation setTheme($theme: JSON) {
        setTheme(theme: $theme) @client
      }
    `
  )
)(({ mutate }) => (
  <CirclePicker
    circleSize={10}
    onChange={c => {
      const theme = createTheme(['#fafafa', '#0A0F14', c.hex])

      tm.stop()
      tm = d3.timeout(
        () =>
          mutate({
            variables: { theme },
            refetchQueries: [
              {
                query: gql`
                  {
                    theme @client
                  }
                `
              }
            ],
            update: () => {
              localStorage.setItem('theme', JSON.stringify(theme))
              window.dispatchEvent(new CustomEvent('resize'))
            }
          }),
        15
      )
    }}
  />
))
