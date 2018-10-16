import theme from '@/theme'
import { rgba, timingFunctions } from 'polished'
import { MdCheck, MdCheckBoxOutlineBlank } from 'react-icons/md'
import { MorphReplace } from 'react-svg-morph'
import { compose, withState } from 'recompose'

import Label from './style'

export interface TOutter {
  title?: string
  checked?: boolean
  style?: string | { [key: string]: any }
  onClick?: (b?: boolean) => void
}

interface TState {
  toggle: (b: boolean, cb: TOutter['onClick']) => void
  isChecked: boolean
}

export default compose<TState & TOutter, TOutter>(
  withState('isChecked', 'toggle', ({ checked }) => checked)
)(({ title, isChecked, toggle, onClick = () => 1 }) => (
  <Label
    checked={isChecked}
    href="javascript:;"
    onClick={() => toggle(!isChecked, onClick.bind(null))}>
    <MorphReplace
      width={13}
      height={13}
      rotation="none"
      duration={130}
      easing={timingFunctions('easeInCubic')}>
      {isChecked ? (
        <MdCheck key="checked" viewBox="0 0 24 24" fill={theme.colours.base} />
      ) : (
        <MdCheckBoxOutlineBlank
          key="checkbox"
          viewBox="0 0 24 24"
          fill={rgba(theme.colours.base, 0.5)}
        />
      )}
    </MorphReplace>
    {title}
  </Label>
))
