import { createTheme } from '@/theme'
import gql from 'graphql-tag'
import { graphql, MutateProps } from 'react-apollo'
import { CirclePicker, ColorChangeHandler } from 'react-color'
import { Box, BoxProps } from 'rebass'
import { compose, setDisplayName } from 'recompose'

export default compose<PickerProps, {}>(
  setDisplayName('theme-picker'),
  graphql(
    gql`
      mutation setTheme($theme: String!) {
        setTheme(theme: $theme) {
          __typename
          value
        }
      }
    `
  )
)(({ mutate }) => (
  <Box as="div" className="picker">
    <CirclePicker
      width="224px"
      circleSize={6}
      circleSpacing={6}
      onSwatchHover={({ hex }: any) => {
        const theme = JSON.stringify(createTheme(hex))

        mutate({
          variables: { theme },
          optimisticResponse: {
            __typename: 'Mutation',
            setTheme: {
              __typename: 'Theme',
              value: theme
            }
          },
          update: (proxy, { data: { setTheme } }) =>
            proxy.writeQuery({
              query: gql`
                {
                  theme {
                    value
                  }
                }
              `,
              data: { theme: setTheme }
            })
        })
      }}
    />
  </Box>
))

export interface PickerProps extends MutateProps, BoxProps {
  onChange?: ColorChangeHandler
}
