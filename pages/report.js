import styled from 'styled-components'
import Table from '@/components/common/table'

const Report = styled.div`
table {
  width: calc(100% + calc(var(--grid) * 6));
  margin-left: calc(var(--grid) * -3);

  tr > *:first-child,
  tr > *:last-child {
    padding: 0 25px;
  }
}

td a {
  display: block;
  color: var(--text);

  em {
    display: block;
  }

  .oi {
    font-size: 50%;
    margin-right: 10px;
  }
}

tr:hover * {
  color: var(--primary);
  transition: none;
}
`

export default ({ query }) => (
  <Report>
    <h1>Report generated, #{query.id}</h1>

    <Table headers={['Date', 'Title', 'Img', 'Price', 'Reviews']}>
      {[...Array(100)].map(i => (
        <tr key={i}>
          <td>05/05/05 13:30</td>

          <td>
            <a href='//ebay.com' target='_blank'>
              <span className='oi' data-glyph='location' />
              Canon Camera
              <em>//ebay.com/path/to/product</em>
            </a>
          </td>

          <td>
            <img src='https://placeimg.com/500/500/nature' />
            <img src='https://placeimg.com/500/500/nature' />
          </td>

          <td>$9.99</td>
          <td>300</td>
        </tr>
      ))}
    </Table>
  </Report>
)
