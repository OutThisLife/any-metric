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

          <link rel="shortcut icon" href={require('./favicon.jpg')} />

          <link
            rel="stylesheet"
            href="//cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css"
          />

          {this.props.styleTags}

          <script src="//polyfill.io/v2/polyfill.min.js" />
        </Head>

        <body>
          <Main />
          <NextScript />

          <script
            src="https://www.googletagmanager.com/gtag/js?id=UA-10405648-19"
            async
          />

          <script
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'UA-10405648-19');`
            }}
          />
        </body>
      </html>
    )
  }
}
