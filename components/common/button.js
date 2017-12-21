import styled from 'styled-components'

const Button = styled.a`
cursor: pointer;
display: inline-block;
color: var(--text);
text-align: center;
line-height: 1;
padding: calc(var(--grid)) calc(var(--grid) * 2);
border: 1px solid var(--primary);
background: ${({ outline }) => outline ? 'rgba(0,0,0,.2)' : 'var(--primary)'};

&:hover {
  background: ${({ outline }) => outline ? 'var(--primary)' : 'inherit'};
}
`

export default props => {
  const { title, url, ...newProps } = props

  return (
    <Button href={url} {...newProps}>
      {title}
    </Button>
  )
}
