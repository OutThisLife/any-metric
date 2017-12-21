import styled from 'styled-components'

const Table = styled.table`
table-layout: fixed;
border-collapse: collapse;
width: 100%;

tr, td, th {
  margin: 0;
  padding: 0;
  text-align: left;
}

th {
  opacity: 0.6;
  color: var(--primary);
  text-transform: uppercase;
}

th, td {
  padding: 5px;
}

tbody tr {
  &:hover {
    transition: none;
    background: rgba(0,0,0,.2);
  }

  &:not(:hover) {
    opacity: 0.5;
  }

  td > img:first-child {
    max-width: 60px;

    + img {
      z-index: 2;
      pointer-events: none;
      position: fixed;
      top: 0;
      right: 0;
      max-width: 50vh;
    }

    &:not(:hover) + img {
      display: none;
    }
  }
}
`

export default ({ headers, children }) => (
  <Table>
    <thead>
      <tr>
        {headers.map(h => <th key={Math.random()}>{h}</th>)}
      </tr>
    </thead>

    <tbody>{children}</tbody>
  </Table>
)

