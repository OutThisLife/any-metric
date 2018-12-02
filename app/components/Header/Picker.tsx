import { createTheme } from '@/theme'
import * as d3 from 'd3'
import gql from 'graphql-tag'
import { graphql, MutateProps } from 'react-apollo'
import { CirclePicker, ColorChangeHandler, SketchPicker } from 'react-color'
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
  <div className="picker">
    <CirclePicker
      width="224px"
      onChange={onChange}
      circleSize={6}
      circleSpacing={6}
    />

    <a
      href="javascript:;"
      tabIndex={1}
      onClick={() => open(!isOpen)}
      onBlur={() => open(false)}>
      &hellip;
    </a>

    {isOpen && (
      <SketchPicker
        width="150px"
        onChange={onChange}
        disableAlpha
        presetColors={[]}
      />
    )}
  </div>
))

export interface PickerProps {
  isOpen?: boolean
  open?: (b: boolean) => void
  onChange?: ColorChangeHandler
}
