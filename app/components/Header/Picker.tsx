import * as Form from '@/components/Form'
import { getTheme } from '@/lib/queries'
import { BaphoTheme, createTheme } from '@/theme'
import gql from 'graphql-tag'
import { graphql, MutateProps } from 'react-apollo'
import { CirclePicker, ColorChangeHandler } from 'react-color'
import { IoIosSave, IoMdExit, IoMdThermometer } from 'react-icons/io'
import { BoxProps } from 'rebass'
import { compose, setDisplayName, withHandlers, withState } from 'recompose'

import Picker from './Picker.style'

export default compose<PickerProps & PickerState & BaphoTheme, {}>(
  setDisplayName('theme-picker'),
  withState('isOpen', 'toggle', false),
  getTheme(),
  graphql(
    gql`
      mutation setTheme($theme: String!) {
        setTheme(theme: $theme) {
          __typename
          value
        }
      }
    `
  ),
  withHandlers<PickerProps, PickerState>(() => ({
    setTheme: ({ mutate }) => value => {
      try {
        const theme = (() => {
          if (typeof value === 'string') {
            return JSON.stringify(JSON.parse(value))
          }

          return JSON.stringify(value)
        })()

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
      } catch (err) {
        // noop
      }
    }
  }))
)(({ isOpen, toggle, theme: currentTheme, setTheme }) => (
  <Picker as="div">
    <div className="circle-picker">
      <CirclePicker
        width="224px"
        circleSize={6}
        circleSpacing={6}
        onSwatchHover={({ hex }: any) => setTheme(createTheme(hex))}
      />

      <a href="javascript:;" onClick={() => toggle(!isOpen)}>
        <IoMdThermometer />
      </a>
    </div>

    {isOpen && (
      <Form.Container
        onSubmit={({ currentTarget: el }) =>
          setTheme(el.querySelector('textarea').value)
        }>
        <div className="controls">
          <Form.Button type="submit" variant="icon | noBorder">
            <IoIosSave />
          </Form.Button>

          <Form.Button
            type="button"
            variant="icon | noBorder"
            onClick={() => toggle(false)}>
            <IoMdExit />
          </Form.Button>
        </div>

        <Form.Input
          as="textarea"
          defaultValue={JSON.stringify(currentTheme, null, 2)}
          onKeyPress={({ which, ctrlKey, currentTarget: el }) =>
            which === 13 &&
            ctrlKey &&
            (el.parentElement.parentElement as HTMLFormElement).submit()
          }
        />
      </Form.Container>
    )}
  </Picker>
))

export interface PickerState {
  isOpen?: boolean
  toggle?: (b: boolean) => void
  setTheme?: (theme: any) => void
}

export interface PickerProps extends MutateProps, BoxProps {
  onChange?: ColorChangeHandler
}
