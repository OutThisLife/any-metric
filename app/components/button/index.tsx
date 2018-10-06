import Button from './styled'

interface TOutter {
  title?: string
  Icon?: JSX.Element | React.SFC
  variant?: string
  [key: string]: any
}

export default ({ title, Icon, ...props }: TOutter) => (
  <Button {...props}>
    {title && typeof Icon === 'object' ? Icon : null}
    {title ? <span className="title">{title}</span> : <span className="icon">{Icon}</span>}
  </Button>
)
