import { ResponsiveBullet as Bullet } from '@nivo/bullet'

import Charts from './style'
import Title from './title'

export default () => (
  <Charts>
    <Title title="Volume" num={350} perc={155} />

    <Bullet
      animate={false}
      margin={{
        top: 20,
        right: 20,
        bottom: 60,
        left: 30
      }}
      data={[
        {
          id: 'temp.',
          ranges: [39, 18, 121, 0, 140],
          measures: [12],
          markers: [118]
        },
        {
          id: 'power',
          ranges: [1.2916181416778634, 0.007427638913805868, 1.9036119007565824, 0, 2],
          measures: [0.8142066134726726, 1.1396970680269156],
          markers: [1.8831418824302117]
        },
        {
          id: 'volume',
          ranges: [23, 27, 0, 36, 2, 65, 0, 80],
          measures: [14],
          markers: [51]
        },
        {
          id: 'cost',
          ranges: [260588, 94421, 24738, 0, 500000],
          measures: [9224, 33286],
          markers: [347962]
        },
        {
          id: 'revenue',
          ranges: [8, 1, 0, 0, 9],
          measures: [5],
          markers: [8.026927064756212, 8.767281997526865]
        }
      ]}
      spacing={46}
      titleAlign="start"
      titleOffsetX={-70}
      measureSize={0.2}
      animate={true}
      motionStiffness={90}
      motionDamping={12}
    />
  </Charts>
)
