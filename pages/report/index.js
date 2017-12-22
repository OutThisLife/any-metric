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

  if (!item) {
    return null
  }

  const { title, url, updated, spider } = item

  return (
    <Report>
      <PageTitle title={`Report for <code>${url}</code>`}>
        <small>
          Last crawled ${updated}
        </small>

        <a href='javascript:;' onClick={() => crawl(item, meta => {
          data[idx].spider.push(meta)
          handle(data)
        })}>
          <Icon i='loop-circular' size='1rem' />
        </a>
      </PageTitle>

      {spider.length > 0 && <Chart data={spider.map(({ date, price }) => ({ x: date, y: price }))} />}

      {spider.length > 0 && (
        <Table headers={['Date', 'Img', 'Name', 'Price', 'Reviews']}>
          {spider.map(({ id, date, img, price, reviews }) => (
            <tr key={i}>
              <td>{date}</td>

              <td>
                <img src={img} />
                <img src={img} />
              </td>

              <td>
                <a href={url} target='_blank'>
                  <Icon i='location' /> {title}
                  <em>{url}</em>
                </a>
              </td>

              <td>
                {price}
                &nbsp;<Icon i='caret-top' /> <em>(+50%)</em>
              </td>

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
