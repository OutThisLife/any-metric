import { GET_THEME, SET_THEME } from '@/lib/queries'
import { BaphoTheme, createTheme } from '@/theme'
import * as d3 from 'd3'
import { graphql, MutateProps } from 'react-apollo'
import { CirclePicker } from 'react-color'
import { BoxProps } from 'rebass'
import { compose, setDisplayName, withHandlers } from 'recompose'

import Picker from './Picker.style'

export default compose<PickerProps & PickerState, {}>(
  setDisplayName('theme-picker'),
  graphql(SET_THEME),
  withHandlers<PickerProps, PickerState>(() => ({
    setTheme: ({ mutate }) => value => {
      try {
        const theme = JSON.stringify(
          typeof value !== 'string' ? value : JSON.parse(value)
        )

        window.requestAnimationFrame(async () =>
          mutate({
            variables: { theme },
            optimisticResponse: {
              __typename: 'Mutation',
              setTheme: theme
            },
            update: proxy =>
              proxy.writeQuery({
                query: GET_THEME,
                data: { theme }
              })
          })
        )
      } catch (err) {
        // noop
      }
    }
  }))
)(({ setTheme }) => (
  <Picker as="div">
    <CirclePicker
      width="224px"
      circleSize={5}
      circleSpacing={6}
      onSwatchHover={({ hex }: any) => setTheme(createTheme(hex))}
      colors={[
        d3.interpolateRainbow,
        d3.interpolateMagma,
        d3.interpolateViridis,
        d3.interpolateWarm,
        d3.interpolateCool,
        d3.interpolateSinebow,
        d3.interpolateSpectral
      ].reduce(
        (acc, int) =>
          acc.push(
            ...[...Array(10).keys()].map(i =>
              d3.scaleSequential(int).domain([1, 100])((1 + i) * 10)
            )
          ) && acc,
        []
      )}
    />
  </Picker>
))

export interface PickerState {
  setTheme?: (theme: any) => void
}

export type PickerProps = MutateProps & BoxProps & BaphoTheme
