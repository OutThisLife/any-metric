import Box from '@/components/Box'
import styled from 'styled-components'

export default styled(Box)`
  @media (min-width: 1440px) {
    grid-template-columns: repeat(2, 1fr);
    align-self: stretch;
    overflow: hidden;
  }

  > div {
    position: relative;
    width: 100%;
    align-self: inherit;
  }
`
