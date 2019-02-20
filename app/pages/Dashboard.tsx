import Chart from '@/components/Chart'
import Search from '@/components/Search'
import { Box } from 'rebass'
import { compose, setDisplayName } from 'recompose'
import { prop } from 'styled-tools'

export default compose(setDisplayName('dashboard'))(() => (
  <Box
    css={`
      --pad: 25px;

      overflow: hidden;
      margin: auto;
      padding: var(--pad);

      @media (min-width: 1025px) {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: max-content 1fr;
        width: 100vw;
        height: 100vh;
      }

      > section {
        @media (min-width: 1025px) {
          display: grid;
          grid-template-columns: repeat(2, 50%);
          grid-gap: var(--pad);
          align-items: center;
          justify-content: center;
          height: calc(100vh - (var(--pad) * 4));
          overflow: hidden;
        }

        > aside {
          border: 1px solid ${prop('theme.border')};

          @media (min-width: 1025px) {
            height: calc(100vh - (var(--pad) * 6));
            overflow: auto;
          }

          @media (max-width: 1025px) {
            margin-top: var(--pad);
          }
        }
      }
    `}>
    <Search />
    <Chart />
  </Box>
))
