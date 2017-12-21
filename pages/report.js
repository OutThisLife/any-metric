import styled from 'styled-components'
import Table from '@/components/common/table'

const Report = styled.div`
table td > img:first-child {
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
`

export default ({ query }) => (
  <Report>
    <h1>Report generated, #{query.id}</h1>

    <Table headers={['Date', 'Title', 'Img', 'Price', 'Reviews']}>
      {[...Array(100)].map(i => (
        <tr key={i}>
          <td>05/05/05 13:30</td>
          <td>Canon Camera</td>
          <td>
            <img src='https://dummyimage.com/600x400/000/fff' />
            <img src='https://dummyimage.com/600x400/000/fff' />
          </td>
          <td>$9.99</td>
          <td>300</td>
        </tr>
      ))}
    </Table>
  </Report>
)
