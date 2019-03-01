import Chart from '@/components/Chart'
import Price from '@/components/Chart/Price'
import Footer from '@/components/Footer'
import List from '@/components/List'
import Loader from '@/components/Loader'
import Meta from '@/components/Meta'
import Search from '@/components/Search'
import Tabs from '@/components/Tabs'
import { GET_VIEW } from '@/lib/queries'
import { View } from '@/server/schema/types'
import { RouterProps, withRouter } from 'next/router'
import { func, object, string } from 'prop-types'
import { DataValue, graphql } from 'react-apollo'
import { Box } from 'rebass'
import {
  branch,
  compose,
  lifecycle,
  renderComponent,
  setDisplayName,
  withContext,
  withState
} from 'recompose'

export const isDesktop = () => 'browser' in process && window.innerWidth > 1025

export default compose<DashboardProps, {}>(
  setDisplayName('dashboard'),
  withRouter,
  branch(
    ({ router }) => !('viewId' in router.query),
    renderComponent(() => null)
  ),
  graphql<DashboardProps, { view: View }>(GET_VIEW, {
    options: ({ router }) => ({
      notifyOnNetworkStatusChange: true,
      variables: {
        objectId: router.query.viewId
      }
    })
  }),
  withState('index', 'scrollToIndex', ''),
  withContext(
    { index: string, scrollToIndex: func, session: object },
    ({ index, scrollToIndex, data }) => ({
      index,
      scrollToIndex,
      session: data.view || { tags: [] }
    })
  ),
  lifecycle<DashboardProps, {}, any>({
    componentDidMount() {
      this.handleKeyPress = ({ key }) => {
        if (document.activeElement instanceof HTMLInputElement) {
          return
        }

        if (key === 'w' && localStorage.getItem('url')) {
          window.open(localStorage.getItem('url'), '_blank')
        }

        if (key === 's') {
          document.body.classList.toggle('lock-chart')
        }
      }

      window.addEventListener('keypress', this.handleKeyPress)
    },

    componentWillUnmount() {
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

        > span {
          justify-self: center;
          text-align: center;
        }

        [class*='Loader'] {
          height: calc(100vh - var(--pad));
        }
      }
    `}>
    <Search />
    <Chart>
      {({ data: { loading }, contentRect: rect, chart }) => (
        <>
          {(loading && !chart.data.length) ||
          !('bounds' in rect) ||
          isNaN(rect.bounds.width) ? (
            <Loader size={120} />
          ) : chart.data.length < 10 ? (
            <span>not enough datapoints</span>
          ) : (
            <Box>
              <Meta key={chart.data.length} data={chart.data} />

              <Price
                width={isDesktop() ? rect.bounds.width / 2 : rect.client.width}
                height={
                  isDesktop() ? rect.bounds.height / 2 : rect.client.width / 2
                }
                ratio={1}
                {...chart}
                {...rect}
              />
            </Box>
          )}

          <Box as="aside">
            <Tabs />

            {loading && !chart.data.length ? (
              <Loader size={60} />
            ) : (
              <List key={chart.data.length} chart={chart} rect={rect} />
            )}
          </Box>
        </>
      )}
    </Chart>

    <Footer />
  </Box>
))

export interface DashboardProps {
  index?: number
  router?: RouterProps
  scrollToIndex?: (a: number) => void
  data?: DataValue<{ view: View }>
}
