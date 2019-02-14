import { Box } from 'rebass'
import styled from 'styled-components'

const Module = ({ className, ...props }) => (
  <Box as="aside" className={className}>
    <Box {...props} />
  </Box>
)

export default styled<any>(Module)`
  > div section {
    padding: calc(var(--pad) / 2);
  }

  h5 {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0;
    padding: 1em;

    @media (max-width: 768px) {
      padding: var(--pad);
      padding-left: 0;

      > span {
        font-size: 0px;
      }
    }

    &:only-child {
      margin: 0;
    }
  }
`
