import Button from '@/components/button'
import { darken } from 'polished'
import { IoMdAddCircle, IoMdFlask } from 'react-icons/io'
import { IconType } from 'react-icons/lib/iconBase'
import styled, { css } from 'styled-components'

interface TOutter {
  title: string
  services: IconType[]
}

export default ({ title, services = [() => null] }: TOutter) => (
  <Title>
    <div>
      <small>
        Updated&nbsp;
        <time>6 hours ago</time>
        <span>
          &mdash;
          <a href="javascript:;">refresh</a>
          ,&nbsp;
          <a href="javascript:;">schedule</a>
        </span>
      </small>
    </div>

    <div className="drag-h">
      <h2>
        <a href="javascript:;">{title}<IoMdFlask /></a>
      </h2>

      <nav>
        {services.length && (
          <figure>
            {services.map(I => (
              <a key={Math.random()} href="javascript:;">
                <I />
              </a>
            ))}
          </figure>
        )}

        <Button href="javascript:;" Icon={<IoMdAddCircle />} />
      </nav>
    </div>
  </Title>
)

const Title = styled.header`
  ${({ theme }) => css`
    padding: calc(var(--pad) / 2) 0;

    .drag-h {
      cursor: move;
    }

    h2 {
      color: ${theme.colours.base};
      margin: 0;

      a[href] {
        text-decoration: none;

        &:hover {
          color: ${theme.colours.base};
        }
      }

      svg {
        opacity: 0.1;
        vertical-align: middle;
        transform: translate3d(5px, -3px, 0);
      }

      div:not(:hover) & svg {
        opacity: 0;
      }
    }

    > div {
      display: flex;
      align-items: center;
      color: ${darken(0.15, theme.colours.panel)};
      border-radius: inherit;

      a[href] {
        color: inherit;

        &.open-stats svg {
          width: 25px;
          margin-left: 0.2em;
        }
      }
    }

    div:not(:hover) & small span {
      visibility: hidden;
    }

    nav {
      display: inherit;
      align-items: inherit;
      margin-left: auto;

      figure {
        display: inherit;
        align-items: inherit;
        margin: 0 var(--pad);

        a + a {
          margin-left: calc(var(--pad) / 3);
        }

        svg {
          fill: currentColor;
          width: 16px;
          height: auto;
        }
      }
    }
  `};
`
