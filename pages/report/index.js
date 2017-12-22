import styled from 'styled-components'
import styles from './styles.scss'
import Icon from '@/components/common/icon'
import Table from '@/components/common/table'
import PageTitle from '@/components/pageTitle'
import Chart from '@/components/chart'
import crawl from '@/services/crawl'

const Report = styled.div`${styles}`

export default ({ handle, query, data }) => {
  const idx = data.findIndex(({ id }) => id.toString() === query.id)
  const item = data[idx]

  const { title, url, updated, spider } = item

  return (
    <Report>
      <PageTitle title={`Report for <code><a href='${url}' target='_blank'>${url}</a></code>`}>
        <small>
          Last crawled ${updated}
        </small>

        <a href='javascript:;' onClick={() => crawl(item, meta => {
          data[idx].spider = Object.assign(spider, meta)
          handle(data)
        })}>
          <Icon i='loop-circular' size='1rem' />
        </a>
      </PageTitle>

      {spider.length > 0 && (
        <Chart
          data={spider.filter(({ price }) => price).map(({ price }, x) => ({
            x,
            y: parseFloat(price.replace(/(\$)/g, ''))
          }))}
        />
      )}

      {spider.length > 0 && (
        <Table headers={['Date', 'Name', 'Img', 'Price', 'Reviews']}>
          {spider.map(({ id, date, title, image, price, reviews }) => (
            <tr key={id}>
              <td>{date}</td>

              <td>{title}</td>

              <td>
                <img src={image || '//placeimg.com/640/480/nature'} />
                <img src={image || '//placeimg.com/640/480/nature'} />
              </td>

              <td>{price}</td>
              <td>{reviews}</td>
            </tr>
          ))}
        </Table>
      )}

      {spider.length === 0 && (
        <p style={{
          display: 'block',
          textAlign: 'center',
          margin: '60px auto 0'
        }}>
          Waiting on crawl info.
        </p>
      )}
    </Report>
  )
}
