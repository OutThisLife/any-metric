import dynamic, { DynamicComponent } from 'next/dynamic'

const chartStyles: TInner['styles'] = {
  Sentiment: dynamic(import('./sentiment')),
  Volume: dynamic(import('./volume'))
}

interface TInner {
  styles: {
    Sentiment: DynamicComponent<{}>
    Volume: DynamicComponent<{}>
  }
}

interface TOutter {
  type: keyof TInner['styles']
}

export default ({ type }: TOutter) => {
  const C = chartStyles[type]
  return <C />
}
