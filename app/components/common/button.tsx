import { LinkHTMLAttributes } from 'react'
import styled from 'styled-components'

interface TInner extends LinkHTMLAttributes<any> {
  title: string
  url?: string
  outline?: boolean
}

export default (props: TInner) => {
  const { title, url = 'javascript:;', ...newProps } = props

  return (
    <Button href={url} {...newProps}>
      {title}
    </Button>
  )
}

const Button = styled.a`
user-select: none;
cursor: pointer;
display: inline-block;
position: relative;
color: var(--text);
text-align: center;
line-height: 1;
padding: calc(var(--grid)) calc(var(--grid) * 2);
border: 1px solid var(--primary);
background: ${({ outline }: any) => outline ? 'rgba(0,0,0,.2)' : 'var(--primary)'};

&:hover {
  background: ${({ outline }: any) => outline ? 'var(--primary)' : 'inherit'};

  &:active {
    transform: translate(0, 2px);
  }
}
`
