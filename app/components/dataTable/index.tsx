import 'react-table/react-table.css'

import { buttonStyles } from '@/components/button'
import { inputStyles } from '@/components/input'
import Link from '@/components/link'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import faker from 'faker'
import { rgba } from 'polished'
import { FiChevronLeft, FiChevronRight, FiTrendingDown, FiTrendingUp } from 'react-icons/fi'
import ReactTable from 'react-table'
import styled from 'styled-components'

dayjs.extend(advancedFormat)

export default () => (
  <DataTable
    pageSize={4}
    minRows={0}
    showPaginationTop={true}
    showPaginationBottom={false}
    pageText=""
    ofText="/"
    rowsText=""
    nextText={<FiChevronRight />}
    previousText={<FiChevronLeft />}
    getTrGroupProps={(_, { original }) => ({
      className: `status-${original.status}`
    })}
    data={[...Array(255).keys()].map(i => ({
      status: i < 2 ? 'unread' : 'read',
      price: faker.commerce.price(),
      title: faker.commerce.productName(),
      image: faker.internet.avatar(),
      date: new Date().toString()
    }))}
    columns={[
      {
        Header: 'Price',
        accessor: 'price',
        maxWidth: 100,
        Cell: ({ value }) => {
          const isDiscount = Math.random() < 0.5
          const num = isDiscount ? '-10' : '10'

          return (
            <p className={`price ${isDiscount ? 'under' : 'over'}`}>
              {value}

              <small>
                &nbsp;
                {isDiscount ? <FiTrendingDown /> : <FiTrendingUp />} {num}%
              </small>
            </p>
          )
        }
      },
      {
        Header: 'Title',
        accessor: 'title',
        Cell: ({ value }) => (
          <div>
            <Link href="#">{value}</Link>
            <p>{faker.lorem.words()}</p>
          </div>
        )
      },
      {
        Header: null,
        accessor: 'image',
        maxWidth: 70,
        headerStyle: { pointerEvents: 'none' },
        style: { textAlign: 'center' },
        Cell: ({ value }) => <img src={value} width={40} />
      },
      {
        Header: 'Date',
        accessor: 'date',
        headerStyle: { textAlign: 'right' },
        style: { textAlign: 'right' },
        Cell: ({ value }) => <time>{dayjs(value).format('MMM. Do, YYYY kk:mm:ss')}</time>
      }
    ]}
  />
)

const DataTable = styled(ReactTable)`
  border: 0;
  margin: auto;

  h2 + & {
    margin-top: -20px;
  }

  .rt-thead.-header,
  .-pagination {
    border: 0;
    box-shadow: none;
  }

  .rt-th {
    text-align: left;
    font-weight: 700;
    font-size: 10px;
    text-transform: uppercase;

    &[style] {
      border: 0;
      padding: var(--pad);
    }
  }

  .rt-tbody {
    .rt-tr-group,
    .rt-td[style] {
      border-color: ${({ theme }) => theme.colours.border};
    }
  }

  [class^='pagination-'] {
    display: flex;
    width: 100%;
  }

  .-pagination {
    display: inline-flex;
    align-items: center;
    width: auto;
    font-size: 11px;
    margin: 0 0 0 auto;

    .-center {
      flex: unset;
      display: inline-block;
    }

    input,
    select {
      ${inputStyles};
      text-align: center;
    }

    button.-btn {
      ${buttonStyles};
      padding: 8px 11px;
      border-radius: ${({ theme }) => theme.inputs.radius}em;
    }
  }

  .rt-tr-group {
    cursor: pointer;
    padding: var(--pad);

    &:hover {
      outline: 1px solid ${({ theme }) => rgba(theme.colours.base, 0.1)};
      outline-offset: -1px;
      box-shadow: 0 2px 3px ${({ theme }) => rgba(theme.colours.base, 0.07)};

      a[rel] {
        text-decoration: underline;
      }
    }

    &.status-unread {
      a[rel],
      .price {
        font-weight: 700;
      }
    }

    &.status-read {
      background: ${({ theme }) => rgba(theme.colours.base, 0.009)};

      &:not(:hover) .rt-td {
        img {
          filter: grayscale(1);
        }

        img,
        time {
          opacity: 0.2;
        }

        p {
          opacity: 0.5;
          color: inherit;
        }
      }
    }

    .rt-td {
      p {
        margin: 0;
      }

      time {
        font-size: 11px;
      }

      .price {
        color: ${({ theme }) => theme.colours.success};

        &.over {
          color: ${({ theme }) => theme.colours.error};

          svg {
            vertical-align: middle;
          }
        }
      }
    }
  }
`
