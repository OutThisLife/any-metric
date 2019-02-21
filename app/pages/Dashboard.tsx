import Chart from '@/components/Chart'
import Search from '@/components/Search'
import { Box } from 'rebass'
import { compose, lifecycle, setDisplayName } from 'recompose'
import { prop } from 'styled-tools'

export default compose(
  setDisplayName('dashboard'),
  lifecycle({
    componentDidMount(this: any) {
      this.handleKeyPress = e => {
        const $a = document.querySelector('[id].active [href]')

        if (e.key === 'w' && $a instanceof HTMLAnchorElement) {
          window.open($a.href, '_blank')
        }
      }

      window.addEventListener('keypress', this.handleKeyPress)
    },

    componentWillUnmount(this: any) {
      window.removeEventListener('keypress', this.handleKeyPress)
    }
  })
)(() => (
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
        position: relative;

        @media (min-width: 1025px) {
          display: grid;
          grid-template-columns: repeat(2, calc(50% - 15px));
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
            overflow: hidden;
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
