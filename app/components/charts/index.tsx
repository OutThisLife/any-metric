import dynamic, { DynamicComponent } from 'next/dynamic'

const chartStyles: TInner['styles'] = {
  Sentiment: dynamic(import('./sentiment'))
}

interface TInner {
  styles: {
    Sentiment: DynamicComponent<{}>
  }
}

interface TOutter {
  type: keyof TInner['styles']
}

export default ({ type }: TOutter) => {
  const C = chartStyles[type]
  return <C />
}
