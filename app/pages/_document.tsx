import { extractStyles } from 'evergreen-ui'
import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class extends Document<{
  styleTags?: string
  hydrationScript?: any
}> {
  public static async getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet()
    const page = renderPage(App => props =>
      sheet.collectStyles(<App {...props} />)
    )
    const { css, hydrationScript } = extractStyles()

    const styleTags = sheet.getStyleElement().filter(k => k.key !== 'evergreen')

    styleTags.push(
      <style key="evergreen" dangerouslySetInnerHTML={{ __html: css }} />
    )

    return { ...page, styleTags, hydrationScript }
  }

  public render() {
    const { styleTags, hydrationScript } = this.props

    return (
      <html lang="en-US">
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
          <meta name="robots" content="noindex" />

          {styleTags}

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
