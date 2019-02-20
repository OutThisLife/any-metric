import { moneyFormat } from '@/lib/utils'
import { Box } from 'rebass'
import { compose, setDisplayName, withHandlers } from 'recompose'

import { ChartState } from '..'

export default compose<ChartState & { onRef: () => void }, ChartState>(
  setDisplayName('chart-times'),
  withHandlers(() => {
    const handleKeyPress = e => {
      const $a = document.querySelector('[id].active [href]')

      if (e.key === 'w' && $a instanceof HTMLAnchorElement) {
        window.open($a.href, '_blank')
      }
    }

    return {
      onRef: () => ref => {
        if (!ref) {
          window.removeEventListener('keypress', handleKeyPress)
          return
        }

        window.addEventListener('keypress', handleKeyPress)
      }
    }
  })
)(({ onRef, data }) => (
  <Box
    as="aside"
    ref={onRef}
    css={`
      align-self: flex-end;
      width: 500px;
      height: calc(100% - 50px);
      overflow: auto;
      border: 1px solid #d9dcde;

      div {
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #bdc3c7;

        &:nth-child(odd) {
          background: #fcfdfe;
        }

        &:hover {
          background: #ecf0f1;
        }

        &.active {
          background: #0000ee;

          a,
          span {
            color: #fff;
          }
        }

        span {
          display: block;
          width: 100%;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          padding: 0.25em;

          &:last-of-type {
            width: 100px;
            text-align: right;
          }
        }
      }
    `}>
    {[].slice
      .call(data)
      .reverse()
      .map((d: any) => (
        <div key={d._id} id={`t-${d._id}`}>
          <span>
            <a href={d.url} target="_blank">
              {d.title}
            </a>
          </span>

          <span>{moneyFormat(d.close)}</span>
        </div>
      ))}
  </Box>
))
