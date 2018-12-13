import { BaphoTheme } from '@/theme'
import { lighten } from 'polished'
import { AtomSpinner } from 'react-epic-spinners'
import { compose, setDisplayName } from 'recompose'
import { withTheme } from 'styled-components'

export default compose<BaphoTheme, {}>(
  setDisplayName('search-loadering'),
  withTheme
)(({ theme }) => (
  <AtomSpinner
    className="spinner"
    size={120}
    color={lighten(0.1, theme.colours.module)}
    animationDuration={1337}
    style={{ gridColumn: '1 / -1', margin: 'auto' }}
  />
))
