import { extractStyles } from 'evergreen-ui'
import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class extends Document<{
  styleTags?: Array<React.ReactElement<{}>>
  css?: string
  hydrationScript?: any
}> {
  public static async getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet()
    const page = renderPage(App => props =>
      sheet.collectStyles(<App {...props} />)
    )
    const styleTags = sheet.getStyleElement()

    const { css, hydrationScript } = extractStyles()

    return { ...page, css, styleTags, hydrationScript }
  }

  public render() {
    const { css, styleTags, hydrationScript } = this.props

    return (
      <html lang="en-US">
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
          <meta name="robots" content="noindex" />

          {styleTags}

          <style key="evergreen" dangerouslySetInnerHTML={{ __html: css }} />

          <link rel="shortcut icon" href="/static/favicon.ico" />
          <script src="//polyfill.io/v2/polyfill.min.js" />
        </Head>

        <body>
          <Main />
          {hydrationScript}
          <NextScript />
        </body>
      </html>
    )
  }
}
