import theme from '@/theme'
import { extractStyles } from 'evergreen-ui'
import Document, { Head, Main, NextScript } from 'next/document'
import { rgba } from 'polished'
import { createGlobalStyle, ServerStyleSheet } from 'styled-components'

export default class extends Document<{
  styleTags?: string
  evergreenCSS?: string
  hydrationScript?: any
}> {
  public static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet()
    const page = renderPage(App => props =>
      sheet.collectStyles(<App {...props} />)
    )
    const styleTags = sheet.getStyleElement()
    const { css: evergreenCSS, hydrationScript } = extractStyles()

    return { ...page, styleTags, evergreenCSS, hydrationScript }
  }

  public render() {
    const { styleTags, evergreenCSS, hydrationScript } = this.props

    return (
      <html lang="en-US">
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
          <meta name="robots" content="noindex" />
          <link
            rel="stylesheet"
            href="//cdn.jsdelivr.net/npm/normalize.css@8.0.0/normalize.min.css"
          />

          <GlobalStyles />
          {styleTags}
          <style dangerouslySetInnerHTML={{ __html: evergreenCSS }} />
        </Head>

        <body>
          <Main />
          {hydrationScript}
          <NextScript />
          <script src="https://cdn.jsdelivr.net/npm/fuzzaldrin-plus@0.6.0/dist-browser/fuzzaldrin-plus.js" />
        </body>
      </html>
    )
  }
}

const GlobalStyles = createGlobalStyle`
  body, html {
    color: ${theme.colours.base};
    font-weight: 400;
    font-family: ${theme.fonts.family.copy};
    font-size: ${theme.fonts.copy};
    line-height: 1.75;
  }

  * {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    box-sizing: border-box;

    &::-webkit-scrollbar {
      width: 8px;
      height: 5px;
      border: 1px ridge transparent;
      background: transparent;
    }

    &::-webkit-scrollbar:hover {
      border-color: ${rgba(theme.colours.base, 0.1)};
      background: ${rgba(theme.colours.base, 0.03)};
    }

    &::-webkit-scrollbar-thumb {
      background: ${theme.colours.base};
    }

    &::selection {
      color: #fff;
      background: ${theme.colours.secondary};
    }
  }

  p,
  blockquote,
  ul,
  li {
    margin: 0;
    padding: 0;
  }

  img,
  svg,
  object,
  embed,
  video,
  audio,
  iframe {
    max-width: 100%;
    height: auto;
    vertical-align: middle;
  }

  [data-id='tooltip'] {
    font-size: 11px;
    padding: 2px 8px;
    transition: none;
  }

  input + button,
  select + button {
    margin-left: -3px !important;
    border-left: 0px !important;
    border-top-left-radius: 0 !important;
    border-bottom-left-radius: 0 !important;
  }
`
