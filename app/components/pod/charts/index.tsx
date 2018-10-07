import { ResponsiveBullet as Bullet } from '@nivo/bullet'
import { ResponsiveRadar as Radar } from '@nivo/radar'

import Charts from './style'

export default () => (
  <Charts>
    <section>
      <Radar
        animate={false}
        margin={{
          top: 60,
          right: 80,
          bottom: 20,
          left: 80
        }}
        data={[
          { language: 'javascript', john: 12, sarah: 32, bob: 27 },
          { language: 'golang', john: 25, sarah: 15, bob: 3 },
          { language: 'python', john: 5, sarah: 22, bob: 31 },
          { language: 'java', john: 19, sarah: 17, bob: 9 }
        ]}
        keys={['john', 'sarah', 'bob']}
        indexBy="language"
      />
    </section>

    <section>
      <Bullet
        animate={false}
        margin={{
          top: 10,
          right: 30,
          bottom: 50,
          left: 110
        }}
        spacing={46}
        titleAlign="start"
        titleOffsetX={-70}
        measureSize={0.2}
        motionStiffness={90}
        motionDamping={12}
        data={[
          {
            id: 'temp.',
            ranges: [41, 34, 66, 0, 140],
            measures: [76],
            markers: [92]
          },
          {
            id: 'power',
            ranges: [0.4779629275747952, 1.1592464264275364, 0.8038276957357593, 0, 2],
            measures: [0.7562583873246955, 1.8047024701245262],
            markers: [1.6626799638027807]
          },
          {
            id: 'volume',
            ranges: [55, 13, 8, 42, 4, 69, 0, 80],
            measures: [3],
            markers: [54]
          },
          {
            id: 'cost',
            ranges: [461642, 35928, 425336, 0, 500000],
            measures: [263156, 411159],
            markers: [377808]
          },
          {
            id: 'revenue',
            ranges: [8, 3, 6, 0, 13],
            measures: [2],
            markers: [8.512495600699411, 8.660962350841546]
          }
        ]}
      />
    </section>
  </Charts>
)
