import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class extends Document<{
  styleTags?: string
  hydrationScript?: any
}> {
  public static async getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet()

    return {
      ...renderPage(App => props => sheet.collectStyles(<App {...props} />)),
      styleTags: sheet.getStyleElement()
    }
  }

  public render() {
    return (
      <html lang="en-US">
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
          <meta name="robots" content="noindex" />

          {this.props.styleTags}

          <link rel="shortcut icon" href="/static/favicon.ico" />
          <script src="//polyfill.io/v2/polyfill.min.js" />

          <script
            src="https://www.googletagmanager.com/gtag/js?id=UA-10405648-19"
            async
          />

          <script
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'UA-10405648-19');`
            }}
          />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
