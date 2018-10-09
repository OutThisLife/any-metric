import Chart from '@/components/charts'
import withDimensions, { DimProps } from '@/lib/withDimensions'
import { compose, setDisplayName } from 'recompose'

import Stats from './style'

interface TOutter {
  data: any[]
}

export default compose<TOutter & DimProps, TOutter>(
  setDisplayName('pod-stats'),
  withDimensions()
)(({ onRef, ...props }) => (
  <Stats innerRef={onRef}>
    <Chart type="Sentiment" {...props} />
  </Stats>
))
