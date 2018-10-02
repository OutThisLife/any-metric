import 'react-vis/dist/style.css'

import { rgba } from 'polished'
import { HorizontalBarSeriesCanvas, XYPlot } from 'react-vis'
import styled, { css } from 'styled-components'

const data = () => [...Array(20)].map(() => ({ y: 0.5, x: Math.random(), size: 1, get color() { return this.x } }))

export default () =>
  typeof window !== 'undefined' && (
    <Stats>
      <section>
        <label>sentiment analysis</label>

        <XYPlot width={300} height={50} margin={0} xDomain={[0, 1]} yDomain={[0, 1]}>
          <HorizontalBarSeriesCanvas colorRange={['#2374B0', '#FF8028']} data={data()} />
          <HorizontalBarSeriesCanvas colorRange={['#2374B0', '#FF8028']} data={data()} />
        </XYPlot>
      </section>
    </Stats>
  )

const Stats = styled.footer`
  ${({ theme }) => css`
    padding: var(--pad);
    background: ${rgba(theme.colours.bg, 0.7)};

    section {
      padding: calc(var(--pad) / 2);

      label {
        font-weight: 700;
        text-transform: uppercase;
      }

      .rv-xy-plot {
        cursor: crosshair;
      }
    }
  `};
`
