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
    }
  }))
)(({ onRef, getQuote, quote }) => (
  <Box
    ref={onRef}
    css={`
      font-size: 11px;
      letter-spacing: 0.03em;

      @media (min-width: 1025px) {
        z-index: 100;
        position: fixed;
        left: var(--pad);
        bottom: var(--pad);
      }

      em {
        color: #f00;
        font-style: normal;
      }
    `}
    onClick={getQuote}
    dangerouslySetInnerHTML={{ __html: `<em>❤</em> ${quote}` }}
  />
))

export interface QuoteProps {
  quote?: string
  getQuote?: () => void
  setQuote?: (s: string) => void
  onRef?: (r: HTMLElement) => void
}
