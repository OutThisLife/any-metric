import { createTheme } from '@/theme'
import * as d3 from 'd3'
import gql from 'graphql-tag'
import { graphql, MutateProps } from 'react-apollo'
import { CirclePicker, ColorChangeHandler } from 'react-color'
import { compose, setDisplayName, withHandlers, withState } from 'recompose'

let tm: d3.Timer | {} = {}

export default compose<PickerProps, {}>(
  setDisplayName('theme-picker'),
  withState('isOpen', 'open', false),
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
  ),
  withHandlers<MutateProps, PickerProps>(() => ({
    onChange: ({ mutate }) => ({ hex }) => {
      const theme = JSON.stringify(createTheme(hex))

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
    }
  }))
)(({ isOpen, open, onChange }) => (
  <div
    tabIndex={0}
    className="picker"
    onFocus={() => open(!isOpen)}
    onBlur={() => open(false)}>
    <CirclePicker
      width="224px"
      onChange={onChange}
      circleSize={6}
      circleSpacing={6}
    />
  </div>
))

export interface PickerProps {
  isOpen?: boolean
  open?: (b: boolean) => void
  onChange?: ColorChangeHandler
}
