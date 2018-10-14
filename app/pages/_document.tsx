import { colours, fonts } from '@/theme'
import Document, { Head, Main, NextScript } from 'next/document'
import { rgba } from 'polished'
import { ServerStyleSheet } from 'styled-components'

export default class extends Document<{ styleTags: string }> {
  public static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet()
    const page = renderPage(App => props =>
      sheet.collectStyles(<App {...props} />)
    )
    const styleTags = sheet.getStyleElement()

    return { ...page, styleTags }
  }

  public render() {
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
          <link rel="stylesheet" href={fonts.family.src()} />

          {this.props.styleTags}

          <style>{`
          :root {
            ${Object.keys(colours).map(k => `--${k}: ${colours[k]};`)};
          }

          html {
            color: ${colours.base};
            font-weight: 500;
            font-family: ${fonts.family.copy};
            font-size: ${fonts.copy};
            line-height: 1.75;
          }

          * {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            box-sizing: border-box;
          }

          *::-webkit-scrollbar {
            width: 8px;
            height: 5px;
            border: 1px ridge transparent;
            background: transparent;
          }

          *::-webkit-scrollbar:hover {
            border-color: ${rgba(colours.base, 0.1)};
            background: ${rgba(colours.base, 0.03)};
          }

          *::-webkit-scrollbar-thumb {
            background: ${colours.base};
          }

          *::selection {
            color: #fff;
            background: ${colours.secondary};
          }
          `}</style>
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
