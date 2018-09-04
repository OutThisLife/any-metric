import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
  static getInitialProps ({ renderPage }) {
    const sheet = new ServerStyleSheet()
    const page = renderPage(App => props => sheet.collectStyles(<App {...props} />))
    const styleTags = sheet.getStyleElement()
    return { ...page, styleTags }
  }

  render () {
    return (
      <html>
        <Head>
          <title>Baphometrics</title>
          <meta name='robots' content='noindex' />

          <link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/open-iconic@1.1.1/font/css/open-iconic.min.css' />

          <style>{`:root{ --font: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol }`}</style>
          {this.props.styleTags}
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
