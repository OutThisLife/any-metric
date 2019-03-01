import * as d3 from 'd3'
import fetch from 'isomorphic-unfetch'
import { Box } from 'rebass'
import { compose, setDisplayName, withHandlers, withState } from 'recompose'

export default compose<FooterProps, {}>(
  setDisplayName('footer'),
  withState('quote', 'setQuote', null),
  withHandlers<FooterProps, FooterProps>(({ setQuote }) => ({
    getQuote: () => async () => {
      try {
        if (Math.random() < 0.3) {
          throw new Error('Mine!')
        }

        const { quoteText, quoteAuthor } = await (await fetch(
          'https://quota.glitch.me/random'
        )).json()

        setQuote(`${quoteText} &mdash; ${quoteAuthor}`)
      } catch (err) {
        setQuote('ilyilyilyilyily &mdash; tal')
      }
    }
  })),
  withHandlers<FooterProps, FooterProps>(({ getQuote }) => ({
    onRef: () => async ref => {
      if (!ref) {
        return
      }

      getQuote()
      d3.interval(getQuote, 3e5)
    }
  }))
)(({ onRef, getQuote, quote }) => (
  <Box
    ref={onRef}
    css={`
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      padding: calc(var(--pad) / 2);

      > div {
        font-size: 11px;
        letter-spacing: 0.03em;
      }

      em {
        color: #f00;
        font-style: normal;
      }
    `}
    onClick={getQuote}>
    <div>W to open item in new tab; S to toggle chart sync</div>
    <div dangerouslySetInnerHTML={{ __html: `${quote} <em>❤</em>` }} />
  </Box>
))

export interface FooterProps {
  quote?: string
  getQuote?: () => void
  setQuote?: (s: string) => void
  onRef?: (r: HTMLElement) => void
}
