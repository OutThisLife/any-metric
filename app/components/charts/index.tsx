import dynamic from 'next/dynamic'

const chartStyles: TInner['styles'] = {
  Sentiment: dynamic(import('./sentiment').then(module => module.default)),
  Volume: dynamic(import('./volume').then(module => module.default))
}


interface TInner {
  styles: {
    Sentiment: DynamicComponent
    Volume: DynamicComponent
  }
}

interface TOutter {
  type: keyof TInner['styles']
}

export default ({ type }: TOutter) => {
  const C = chartStyles[type]
  return <C />
}
