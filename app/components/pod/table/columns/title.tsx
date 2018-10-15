import { darken, rgba } from 'polished'
import styled, { css } from 'styled-components'

import { Cell } from '.'

interface TOutter extends Cell<string> {
  filterData: (t: string) => void
}

export default ({
  cellData: title,
  rowData: { copy, tags },
  filterData
}: TOutter) => (
  <Title>
    <strong>{title}</strong>

    <div>
      <span>{copy}</span>
      <span>
        {tags.filter(t => t).map(t => (
          <label key={`label-${t}`} onClick={() => filterData(t)}>
            {t}
          </label>
        ))}
      </span>
    </div>
  </Title>
)

const Title = styled.div`
${({ theme }) => css`
  [class$='Table__row']:hover & strong {
    color: ${theme.colours.secondary};
    text-decoration: underline;
  }

  > div {
    display: flex;
    align-items: baseline;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    span:first-of-type {
      flex: 1 0 50%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    span:last-of-type {
      margin-left: 8px;

      [class$='Table__row']:not(:hover) & {
        opacity: 0.75;
      }
    }
  }

  label {
    cursor: pointer;
    color: ${theme.colours.base};
    font-size: 0.9em;
    padding: 1px 5px;
    border: 1px solid ${theme.colours.label};
    border-radius: 2px;
    background: ${theme.colours.label};

    [class$='Table__row']:not(:hover) & {
      color: ${rgba(theme.colours.base, 0.7)};
      background: ${rgba(theme.colours.label, 0.1)};
    }

    + label {
      margin-left: 2px;
    }

    &:hover {
      border-color: ${darken(0.25, theme.colours.label)};
    }
  }
`}
  }
`
