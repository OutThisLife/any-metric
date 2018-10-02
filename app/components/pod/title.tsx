import Button from '@/components/button'
import { darken } from 'polished'
import { IoMdAddCircle } from 'react-icons/io'
import { IconType } from 'react-icons/lib/iconBase'
import styled, { css } from 'styled-components'

interface TOutter {
  title: string
  services: IconType[]
}

export default ({ title, services = [() => null] }: TOutter) => (
  <Title>
    <div>
      <h2 dangerouslySetInnerHTML={{ __html: title }} />
      {services.length && <figure>{services.map(I => <I key={Math.random()} />)}</figure>}
      <Button href="javascript:;" Icon={<IoMdAddCircle />} />
    </div>

    <div>
      Updated&nbsp;<time>6 hours ago</time>
      &mdash;
      <a href="javascript:;">refresh</a>,&nbsp;
      <a href="javascript:;">schedule</a>
    </div>
  </Title>
)

const Title = styled.header`
  ${({ theme }) => css`
    padding: calc(var(--pad) / 2) 0;

    > div {
      display: flex;
      align-items: center;
      color: ${darken(0.15, theme.colours.panel)};
      border-radius: inherit;

      a[href] {
        color: inherit;
      }
    }

    h2 {
      color: ${theme.colours.base};
      margin: 0;
    }

    figure {
      display: inherit;
      align-items: inherit;
      margin: 0 var(--pad);

      svg {
        fill: currentColor;
        width: 16px;
        height: auto;

        + svg {
          margin-left: calc(var(--pad) / 3);
        }
      }
    }
  `};
`
