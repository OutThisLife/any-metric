import { Pane } from 'evergreen-ui'

interface Props extends React.CSSProperties {
  children?: React.ReactNode
  [key: string]: any
}

export default (props: Props) => <Pane {...props} />
