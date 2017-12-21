import styled from 'styled-components'
import Icon from '@/components/common/icon'
import Table from '@/components/common/table'
import Chart from '@/components/chart'

const Report = styled.div`
table {
  width: calc(100% + calc(var(--grid) * 6));
  margin-left: calc(var(--grid) * -3);

  th {
    &:first-child,
    &:nth-child(2) {
      width: 90px;
    }
  }

  tr > *:first-child,
  tr > *:last-child {
    padding: 0 25px;
  }

  td a {
    display: block;
    color: var(--text);

    em {
      display: block;
    }
  }

  tr:hover * {
    color: var(--primary);
    transition: none;
  }
}
`

const data = []

for (let x = 1; x <= 30; x++) {
  data.push({ x: x, y: Math.floor(Math.random() * (100)) })
}

export default ({ query }) => (
  <Report>
    <h1>Report for <code>amazon.com/path/to/product</code></h1>

    <Chart data={data} />

    <Table headers={['Date', 'Img', 'Name', 'Price', 'Reviews']}>
      {[...Array(100)].map(i => (
        <tr key={i}>
          <td>05/05/05 13:30</td>

          <td>
            <img src='https://placeimg.com/500/500/nature' />
            <img src='https://placeimg.com/500/500/nature' />
          </td>

          <td>
            <a href='//ebay.com' target='_blank'>
              <Icon i='location' /> Canon Camera
              <em>//ebay.com/path/to/product</em>
            </a>
          </td>

          <td>
            $9.99 <Icon i='caret-top' /> <em>(+50%)</em>
          </td>

          <td>
            300
          </td>
        </tr>
      ))}
    </Table>
  </Report>
)
