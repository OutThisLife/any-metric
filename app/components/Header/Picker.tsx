import * as Form from '@/components/Form'
import { GET_THEME, getTheme, SET_THEME } from '@/lib/queries'
import { BaphoTheme, createTheme } from '@/theme'
import { graphql, MutateProps } from 'react-apollo'
import { CirclePicker, ColorChangeHandler } from 'react-color'
import { IoMdCheckmark, IoMdClose, IoMdThermometer } from 'react-icons/io'
import { BoxProps } from 'rebass'
import { compose, setDisplayName, withHandlers, withState } from 'recompose'

import Picker from './Picker.style'

export default compose<PickerProps & PickerState & BaphoTheme, {}>(
  setDisplayName('theme-picker'),
  withState('isOpen', 'toggle', false),
  getTheme(),
  graphql(SET_THEME),
  withHandlers<PickerProps, PickerState>(() => ({
    setTheme: ({ mutate }) => value => {
      try {
        const theme = JSON.stringify(
          typeof value !== 'string' ? value : JSON.parse(value)
        )

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
        colors={[
          '#6236BA',
          '#CB24A0',
          '#FF467B',
          '#FF825A',
          '#FFBF4F',
          '#F9F871',
          '#0096DC',
          '#12819F',
          '#64BAA9'
        ]}
        circleSize={6}
        circleSpacing={6}
        onSwatchHover={({ hex }: any) => setTheme(createTheme(hex))}
      />

      <a href="javascript:;" tabIndex={-1} onClick={() => toggle(!isOpen)}>
        <IoMdThermometer />
      </a>
    </div>

    {isOpen && (
      <Form.Container
        onSubmit={({ currentTarget: el }) =>
          setTheme(el.querySelector('textarea').value)
        }>
        <div className="controls">
          <Form.Button
            type="button"
            variant="icon | noBorder"
            onClick={() => toggle(false)}>
            <IoMdClose />
          </Form.Button>

          <Form.Button type="submit" variant="icon | noBorder">
            <IoMdCheckmark />
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
