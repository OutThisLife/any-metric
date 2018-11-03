import { Pane } from 'evergreen-ui'
import styled from 'styled-components'

export default styled(props => <Pane {...props} />)`
  width: 100%;

  > div {
    width: 50%;
  }
` as any
