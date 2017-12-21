import styled from 'styled-components'
import styles from './styles.scss'
import Icon from '@/components/common/icon'
import Table from '@/components/common/table'
import PageTitle from '@/components/pageTitle'
import Chart from '@/components/chart'

const Report = styled.div`${styles}`

const fillerData = []

for (let x = 1; x <= 30; x++) {
  fillerData.push({ x: x, y: Math.floor(Math.random() * (100)) })
}

export default ({ query, data }) => {
  if (data.length === 0) {
    return null
  }

  const { title, url, updated, spider } = data.filter(({ id }) => id.toString() === query.id)[0]

  return (
    <Report>
      <PageTitle title={`Report for <code>${url}</code>`}>
        {updated && (
          <small>
            Last crawled ${updated}
          </small>
        )}

        <a href='javascript:;'>
          <Icon i='loop-circular' size='1rem' />
        </a>
      </PageTitle>

      <Chart data={fillerData} />

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
