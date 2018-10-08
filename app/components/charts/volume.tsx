import { ResponsiveBar as Bar } from '@nivo/bar'

import Charts from './style'
import Title from './title'

export default () => (
  <Charts>
    <Title title="Volume" num={350} perc={155} />

    <Bar
      animate={false}
      margin={{
        top: 20,
        right: 20,
        bottom: 60,
        left: 30
      }}
      data={[
        {
          country: 'AD',
          donut: 119,
          donutColor: 'hsl(171, 70%, 50%)'
        },
        {
          country: 'AE',
          donut: 139,
          donutColor: 'hsl(41, 70%, 50%)'
        },
        {
          country: 'AF',
          donut: 129,
          donutColor: 'hsl(163, 70%, 50%)'
        },
        {
          country: 'AG',
          donut: 140,
          donutColor: 'hsl(313, 70%, 50%)'
        },
        {
          country: 'AI',
          donut: 38,
          donutColor: 'hsl(73, 70%, 50%)'
        },
        {
          country: 'AL',
          donut: 1,
          donutColor: 'hsl(198, 70%, 50%)'
        },
        {
          country: 'AM',
          donut: 93,
          donutColor: 'hsl(99, 70%, 50%)'
        }
      ]}
      keys={['donut']}
      indexBy="country"
      padding={0.2}
      groupMode="grouped"
      colors={['rgb(73, 144, 255)', 'rgb(73, 144, 255)']}
      colorBy="id"
      borderColor="inherit:darker(1.6)"
      enableLabel={false}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor="inherit:darker(1.6)"
      motionStiffness={90}
      motionDamping={15}
    />
  </Charts>
)
