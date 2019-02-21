import * as d3 from 'd3'
import fetch from 'isomorphic-unfetch'
import { Box } from 'rebass'
import { compose, setDisplayName, withHandlers, withState } from 'recompose'

export default compose<QuoteProps, {}>(
  setDisplayName('quote'),
  withState('quote', 'setQuote', null),
  withHandlers<QuoteProps, QuoteProps>(({ setQuote }) => ({
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
  withHandlers<QuoteProps, QuoteProps>(({ getQuote }) => ({
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
      position: fixed;
      right: 0;
      bottom: 0;
      font-size: 11px;
      letter-spacing: 0.03em;
      padding: calc(var(--pad) / 2);

      em {
        color: #f00;
        font-style: normal;
      }
    `}
    onClick={getQuote}
    dangerouslySetInnerHTML={{ __html: `${quote} <em>❤</em>` }}
  />
))

export interface QuoteProps {
  quote?: string
  getQuote?: () => void
  setQuote?: (s: string) => void
  onRef?: (r: HTMLElement) => void
}
