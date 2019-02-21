import Chart from '@/components/Chart'
import Quote from '@/components/Quote'
import Search from '@/components/Search'
import { func, number } from 'prop-types'
import { Box } from 'rebass'
import {
  compose,
  lifecycle,
  setDisplayName,
  withContext,
  withState
} from 'recompose'

export default compose<DashboardProps, {}>(
  setDisplayName('dashboard'),
  withState('index', 'scrollToIndex', 0),
  withContext(
    { index: number, scrollToIndex: func },
    ({ index, scrollToIndex }) => ({ index, scrollToIndex })
  ),
  lifecycle({
    componentDidMount(this: any) {
      this.handleKeyPress = e => {
        if (
          e.key === 'w' &&
          !(document.activeElement instanceof HTMLInputElement)
        ) {
          window.open(localStorage.getItem('url'), '_blank')
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
    as="main"
    css={`
      --pad: 15px;

      display: grid;
      grid-template-rows: calc(100% - var(--pad));
      width: 100vw;
      height: 100vh;
      overflow: hidden;
      margin: auto;
      padding: var(--pad);

      @media (min-width: 1025px) {
        grid-template-columns: repeat(2, 1fr);
      }

      @media (max-width: 1025px) {
        grid-template-rows: max-content 1fr;
      }

      > form {
        grid-row: 1;
        grid-column: 1 / 1;
        height: max-content;
      }

      > section {
        display: grid;
        grid-column: 1 / -1;
        position: relative;
        overflow: hidden;

        @media (min-width: 1025px) {
          grid-row: 1;
          grid-template-columns: inherit;
          grid-gap: var(--pad);
          align-items: center;
          justify-content: center;

          > aside {
            margin-top: 6px;
          }
        }

        @media (max-width: 1025px) {
          grid-template-columns: 1fr;
          grid-template-rows: repeat(2, 1fr);

          > aside {
            grid-row: 1;
          }

          > div {
            grid-row: 2;
            align-self: center;
          }
        }
      }
    `}>
    <Search />
    <Chart />
    <Quote />
  </Box>
))

export interface DashboardProps {
  index?: number
  scrollToIndex?: (a: number) => void
}
