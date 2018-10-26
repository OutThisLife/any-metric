import { extractStyles } from 'evergreen-ui'
import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

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

          {styleTags}
          <style dangerouslySetInnerHTML={{ __html: evergreenCSS }} />
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
