import theme from '@/theme'
import { rgba, timingFunctions } from 'polished'
import { MdCheck, MdCheckBoxOutlineBlank } from 'react-icons/md'
import { MorphReplace } from 'react-svg-morph'
import { compose, shouldUpdate, withState } from 'recompose'

import Label from './style'

export interface TOutter {
  title?: string
  initChecked?: boolean
  onClick?: () => void
}

interface TState {
  isChecked?: boolean
  toggle: (b: boolean, cb?: () => void) => void
}

export default compose<TState & TOutter, TOutter>(
  shouldUpdate(() => false),
  withState('isChecked', 'toggle', ({ initChecked }) => initChecked)
)(({ isChecked, toggle, title, onClick = () => 1 }) => (
  <Label
    isChecked={isChecked}
    href="javascript:;"
    onClick={() => toggle(!isChecked, onClick)}>
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
