import Button from '@/components/button/style'
import { setDisplayName } from 'recompose'

interface TOutter {
  title?: string
  Icon?: JSX.Element | React.SFC
  variant?: string
  [key: string]: any
}

export default setDisplayName('Button')(
  ({ title, Icon, ...props }: TOutter) => (
    <Button {...props}>
      {title && typeof Icon === 'object' ? Icon : null}
      {title ? (
        <span className="title">{title}</span>
      ) : (
        <span className="icon">{Icon}</span>
      )}
    </Button>
  )
)
