import { rgba } from 'polished'
import { ReactNode } from 'react'
import styled from 'styled-components'

interface TOutter {
  children?: React.ReactNode
  data: {
    [key: string]: any
  }
}

export default ({ data, children, ...props }: TOutter) => (
  <Pod {...props}>
    <div className="inner">
      <p>{data[0].title}</p>
    </div>

    {children}
  </Pod>
)

const Pod = styled.div`
  .inner {
    width: 100%;
    height: 100%;
    padding: var(--pad);
    border: 1px solid transparent;
    box-shadow: 0 1px 3px 0 ${({ theme }) => rgba(theme.colours.base, 0.15)};
    transition: 100ms ease-in-out;
    background: ${({ theme }) => theme.colours.bg};

    &:hover {
      box-shadow: 0 10px 15px 0 ${({ theme }) => rgba(theme.colours.base, 0.10)};
      transform: translate3d(0, -2px, 0);
    }
  }
`
